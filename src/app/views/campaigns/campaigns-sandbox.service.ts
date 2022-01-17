import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { LogService } from 'app/core/logger/log.service';
import { CloneCampaign } from 'app/core/models/campaigns/clone-campaign.model';
import { ToggleCampaignStatus } from 'app/core/models/campaigns/toggle-campaign-status.model';
import { UsersAsyncService } from 'app/core/services/users-async.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Campaign } from './../../core/models/campaigns/campaign.model';
import { DeleteCampaign } from './../../core/models/campaigns/delete-campaign.model';
import { CampaignsAsyncService } from './../../core/services/campaigns-async.service';
import * as CampaignsActions from './campaigns.store.actions';
import { CampaignsState } from './campaigns.store.state';

/**
 * @description Campaigns sandbox service.
 */
@Injectable()
export class CampaignsSandboxService {
	/**
	 * Selects user's campaigns.
	 */
	@Select(CampaignsState.getCampaigns) campaigns$: Observable<Campaign[]>;

	/**
	 * Creates an instance of campaigns sandbox service.
	 * @param _log
	 * @param _store
	 * @param _campaignAsyncService
	 * @param _userAsyncService
	 */
	constructor(
		private _log: LogService,
		private _store: Store,
		private _campaignAsyncService: CampaignsAsyncService,
		private _userAsyncService: UsersAsyncService
	) {}

	/**
	 * @description Gets user campaigns.
	 */
	getUserCampaigns(): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._userAsyncService
			.getCampaigns$(userId)
			.pipe(tap((campaigns) => this._store.dispatch(new CampaignsActions.SetUserCampaigns(campaigns))))
			.subscribe();
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
}
