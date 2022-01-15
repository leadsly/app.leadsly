import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { LogService } from 'app/core/logger/log.service';
import { ToggleCampaignStatus } from 'app/core/models/campaigns/toggle-campaign-status.model';
import { UsersAsyncService } from 'app/core/services/users-async.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
		this._campaignAsyncService
			.toggleActiveCampaign$(campaign)
			.pipe(tap(() => this._store.dispatch(new CampaignsActions.ToggleStatus(campaign))))
			.subscribe();
	}

	/**
	 * @description Deletes campaign.
	 * @param campaign
	 */
	deleteCampaign(campaign: DeleteCampaign): void {
		this._campaignAsyncService
			.deleteCampaign$(campaign)
			.pipe(tap(() => this._store.dispatch(new CampaignsActions.Delete(campaign))))
			.subscribe();
	}
}
