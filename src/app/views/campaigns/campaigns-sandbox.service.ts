import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofActionCompleted, Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { NotificationService } from 'app/core/core.module';
import { InternalServerError } from 'app/core/error-handler/internal-server-error.decorator';
import { ProblemDetailsError } from 'app/core/error-handler/problem-details-error.decorator';
import { LeadslyState } from 'app/core/leadsly/leadsly.store.state';
import { LogService } from 'app/core/logger/log.service';
import { CampaignType } from 'app/core/models/campaigns/campaign-type';
import { CloneCampaign } from 'app/core/models/campaigns/clone-campaign.model';
import { PrimaryProspectList } from 'app/core/models/campaigns/primary-prospect-list';

import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { UpdateOperation } from 'app/core/models/update-operation.model';
import { CampaignsHelperService } from 'app/core/services/campaigns/campaigns-helper.service';
import { ProspectListAsyncService } from 'app/core/services/prospect-list-async.service';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CampaignsAsyncService } from '../../core/services/campaigns/campaigns-async.service';
import { Campaign } from './../../core/models/campaigns/campaign.model';
import { DeleteCampaign } from './../../core/models/campaigns/delete-campaign.model';
import { NewCampaign } from './../../core/models/campaigns/new-campaign';
import * as CampaignsActions from './campaigns.store.actions';
import { CampaignsState } from './campaigns.store.state';

/**
 * @description Campaigns sandbox service.
 */
@Injectable()
export class CampaignsSandboxService {
	/**
	 * Problem details error for account module.
	 */
	@ProblemDetailsError() problemDetails$: Observable<ProblemDetails>;
	/**
	 * Internal server error for account model.
	 */
	@InternalServerError() internalServerErrorDetails$: Observable<InternalServerErrorDetails>;
	/**
	 * Selects user's campaigns.
	 */
	@Select(CampaignsState.selectCampaigns) campaigns$: Observable<Campaign[]>;

	/**
	 * @description Available campaign types.
	 */
	campaignTypes$ = of<CampaignType[]>([{ id: '1', type: 'FollowUp' }]);

	/**
	 * @description When new campaign has been created.
	 */
	newCampaignCreated$: Observable<any> = this._actions$.pipe(ofActionCompleted(CampaignsActions.Create));

	/**
	 * @description Prospect lists for the current user.
	 */
	@Select(CampaignsState.selectUserProspectLists) prospectLists$: Observable<PrimaryProspectList[]>;

	/**
	 * Creates an instance of campaigns sandbox service.
	 * @param _log
	 * @param _store
	 * @param _campaignAsyncService
	 * @param _prospectListAsyncService
	 * @param _campaignsHelperService
	 * @param router
	 */
	constructor(
		private _log: LogService,
		private _store: Store,
		private _actions$: Actions,
		private _campaignAsyncService: CampaignsAsyncService,
		private _notificationService: NotificationService,
		private _prospectListAsyncService: ProspectListAsyncService,
		private _campaignsHelperService: CampaignsHelperService,
		public router: Router
	) {}

	/**
	 * @description Gets user campaigns.
	 */
	getUserCampaigns$(): Observable<Campaign[]> {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		return this._store.selectOnce(CampaignsState.selectCampaigns).pipe(
			switchMap((campaigns) => {
				return iif(
					() => campaigns.length === 0,
					this._campaignAsyncService.getCampaigns$(userId).pipe(
						tap((resp) => this._store.dispatch(new CampaignsActions.SetUserCampaigns(resp))),
						map((resp) => resp?.items)
					),
					of(campaigns)
				);
			})
		);
	}

	/**
	 * @description Updates campaign.
	 * @param campaign
	 */
	update(updateOperations: UpdateOperation[], campaignId: string): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._campaignAsyncService
			.update$(updateOperations, userId, campaignId)
			.pipe(tap((campaign) => this._store.dispatch(new CampaignsActions.Update(campaign))))
			.subscribe();
	}

	/**
	 * @description Deletes campaign.
	 * @param campaign
	 */
	delete(campaign: DeleteCampaign): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		// TODO add catchError incase server is down to roll back changes locally because were doing optimistic updates here
		this._store
			.dispatch(new CampaignsActions.Delete(campaign))
			.pipe(switchMap(() => this._campaignAsyncService.delete$(campaign.id, userId)))
			.subscribe();
	}

	/**
	 * @description Clones the campaign.
	 * @param cloneCampaign
	 * @param clonedCampaign
	 */
	clone(cloneCampaign: CloneCampaign, clonedCampaign: Campaign): void {
		throw new Error('Method not implemented.');
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		// TODO add catchError incase server is down to roll back changes locally because were doing optimistic updates here
		this._store
			.dispatch(new CampaignsActions.Create({ campaign: clonedCampaign }))
			.pipe(
				switchMap(() => this._campaignAsyncService.clone$(cloneCampaign.id, userId)),
				tap((updatedId) =>
					this._store.dispatch(new CampaignsActions.UpdateClonedCampaignId({ clonedCampaign: updatedId, tempId: clonedCampaign.id }))
				)
			)
			.subscribe();
	}

	/**
	 * @description Creates and launchs a new campaign.
	 * @param newCampaign
	 */
	launchNewCampaign(newCampaign: NewCampaign): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		const connectedAccount = this._store.selectSnapshot(LeadslyState.selectConnectedEmail);
		const halId = this._store.selectSnapshot(LeadslyState.selectHalId);
		const launchCampaign = this._campaignsHelperService.newCampaign(newCampaign, connectedAccount, halId);
		this._log.debug('launchNewCampaign', this, launchCampaign);
		this._campaignAsyncService
			.create$(launchCampaign, userId)
			.pipe(
				tap((resp) => this._store.dispatch(new CampaignsActions.Create({ campaign: resp }))),
				tap((_) => this._notificationService.success('Campaign created successfully'))
			)
			.subscribe();
	}

	/**
	 * @description Gets users prospect lists.
	 */
	getUsersProspectLists(): void {
		const id = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._log.debug('getUserProspectLists executed. User id is: ', this, id);
		this._prospectListAsyncService
			.getUsersProspectLists$(id)
			.pipe(tap((resp) => this._store.dispatch(new CampaignsActions.SetUserProspectLists(resp.data))))
			.subscribe();
	}
}
