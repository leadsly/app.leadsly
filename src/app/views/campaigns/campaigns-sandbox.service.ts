import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { InternalServerError } from 'app/core/error-handler/internal-server-error.decorator';
import { ProblemDetailsError } from 'app/core/error-handler/problem-details-error.decorator';
import { LeadslyState } from 'app/core/leadsly/leadsly.store.state';
import { LogService } from 'app/core/logger/log.service';
import { CampaignType } from 'app/core/models/campaigns/campaign-type';
import { CloneCampaign } from 'app/core/models/campaigns/clone-campaign.model';
import { PrimaryProspectList } from 'app/core/models/campaigns/primary-prospect-list';
import { ToggleCampaignStatus } from 'app/core/models/campaigns/toggle-campaign-status.model';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { CampaignsHelperService } from 'app/core/services/campaigns/campaigns-helper.service';
import { ProspectListAsyncService } from 'app/core/services/prospect-list-async.service';
import { Observable, of } from 'rxjs';
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
	@Select(CampaignsState.getCampaigns) campaigns$: Observable<Campaign[]>;

	/**
	 * @description Available campaign types.
	 */
	campaignTypes$ = of<CampaignType[]>([{ id: '1', type: 'FollowUp' }]);

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
		private _campaignAsyncService: CampaignsAsyncService,
		private _prospectListAsyncService: ProspectListAsyncService,
		private _campaignsHelperService: CampaignsHelperService,
		public router: Router
	) {}

	/**
	 * @description Gets user campaigns.
	 */
	// getUserCampaigns(): void {
	// 	const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
	// 	this._campaignAsyncService
	// 		.getCampaigns$(userId)
	// 		.pipe(tap((campaigns) => this._store.dispatch(new CampaignsActions.SetUserCampaigns(campaigns))))
	// 		.subscribe();
	// }
	getUserCampaigns$(): Observable<Campaign[]> {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		return this._campaignAsyncService.getCampaigns$(userId).pipe(
			tap((resp) => this._store.dispatch(new CampaignsActions.SetUserCampaigns(resp))),
			map((resp) => resp?.items)
		);
	}

	/**
	 * @description Updates campaign.
	 * @param campaign
	 */
	updateCampaign(campaign: Campaign): void {
		this._campaignAsyncService
			.updateCampaign$(campaign)
			.pipe(tap((campaign) => this._store.dispatch(new CampaignsActions.Update(campaign))))
			.subscribe();
	}

	/**
	 * @description Toggle's campaign active status.
	 * @param campaign
	 */
	toggleCampaign(campaign: ToggleCampaignStatus): void {
		// TODO add catchError incase server is down to roll back changes locally because were doing optimistic updates here
		this._store
			.dispatch(new CampaignsActions.ToggleStatus(campaign))
			.pipe(switchMap(() => this._campaignAsyncService.toggleActiveCampaign$(campaign)))
			.subscribe();
	}

	/**
	 * @description Deletes campaign.
	 * @param campaign
	 */
	deleteCampaign(campaign: DeleteCampaign): void {
		// TODO add catchError incase server is down to roll back changes locally because were doing optimistic updates here
		this._store
			.dispatch(new CampaignsActions.Delete(campaign))
			.pipe(switchMap(() => this._campaignAsyncService.deleteCampaign$(campaign)))
			.subscribe();
	}

	/**
	 * @description Clones the campaign.
	 * @param cloneCampaign
	 * @param clonedCampaign
	 */
	cloneCampaign(cloneCampaign: CloneCampaign, clonedCampaign: Campaign): void {
		// TODO add catchError incase server is down to roll back changes locally because were doing optimistic updates here
		this._store
			.dispatch(new CampaignsActions.Create(clonedCampaign))
			.pipe(
				switchMap(() => this._campaignAsyncService.cloneCampaign$(cloneCampaign)),
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
		const connectedAccount = this._store.selectSnapshot(LeadslyState.selectConnectedEmail);
		const halId = this._store.selectSnapshot(LeadslyState.selectHalId);
		const launchCampaign = this._campaignsHelperService.newCampaign(newCampaign, connectedAccount, halId);
		this._log.debug('launchNewCampaign', this, launchCampaign);
		this._campaignAsyncService
			.createCampaign$(launchCampaign)
			.pipe(tap((resp) => this._store.dispatch(new CampaignsActions.Create(resp.data))))
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
