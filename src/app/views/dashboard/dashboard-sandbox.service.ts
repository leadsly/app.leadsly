import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { LogService } from 'app/core/logger/log.service';
import { Campaign } from 'app/core/models/campaigns/campaign.model';
import { GetCampaign } from 'app/core/models/campaigns/get-campaign.model';
import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';
import { SelectedCampaign } from 'app/core/models/reports/selected-campaign.model';
import { DashboardAsyncService } from 'app/core/services/dashboard-async.service';
import { UsersAsyncService } from 'app/core/services/users-async.service';
import { Observable, tap } from 'rxjs';
import * as CampaignsActions from '../campaigns/campaigns.store.actions';
import { CampaignsState } from '../campaigns/campaigns.store.state';
import { GetCampaigns } from './../../core/models/campaigns/get-campaigns-model';
import { CacheService } from './../../core/services/cache.service';
import { CampaignsAsyncService } from './../../core/services/campaigns-async.service';
import * as Dashboard from './dashboard.store.actions.ts';
import { DashboardState } from './dashboard.store.state.ts';

/**
 * @description Dashboard sandbox service.
 */
@Injectable({
	providedIn: 'root'
})
export class DashboardSandboxService {
	/**
	 * @description Gets campaigns effectiveness report.
	 */
	@Select(DashboardState.getCampaignsIdsUsedForReport) campaignsIdsUsedForReport$: Observable<string[]>;

	/**
	 * @description Selects id for the selected campaign effectiveness report.
	 */
	@Select(DashboardState.getSelectedCampaignId) selectedCampaignId$: Observable<string>;

	/**
	 * @description Gets campaigns effectiveness by id.
	 */
	@Select(DashboardState.getEffectivenessReportByCampaignId) getEffectivenessReportByCampaignId$: Observable<
		(id: string) => {
			chartOptionsApex: ChartOptionsApex;
		}
	>;

	/**
	 * @description Gets users campaigns.
	 */
	@Select(CampaignsState.getCampaigns) campaigns$: Observable<Campaign[]>;

	/**
	 * @description Gets campaign by its id.
	 */
	@Select(CampaignsState.getCampaignById) getCampaignById$: Observable<(id: string) => Campaign>;

	/**
	 * Creates an instance of dashboard sandbox service.
	 * @param _log
	 * @param _store
	 * @param _dashboardAsyncService
	 * @param _userAsyncService
	 * @param router
	 */
	constructor(
		private _log: LogService,
		private _store: Store,
		private _dashboardAsyncService: DashboardAsyncService,
		private _campaignAsyncService: CampaignsAsyncService,
		private _userAsyncService: UsersAsyncService,
		private _cacheService: CacheService,
		public router: Router
	) {}

	/**
	 * @description Gets user's campaigns effectiveness report
	 */
	getUserCampaignsEffectivenessReport(): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._cacheService
			.getCampaignsEffectivenessReportsData$(userId)
			.pipe(tap((options) => this._store.dispatch(new Dashboard.InitializeCampaignsEffectivenessReport(options))))
			.subscribe();
	}

	/**
	 * @description Updates effectiveness report chart options.
	 * @param chartOptions
	 */
	updateEffectivenessReportChartOptions(chartOptions: Partial<ChartOptionsApex>): void {
		this._log.trace('[DashboardSandboxService] updateEffectivenessReportChartOptions dispatching action with options: ', chartOptions);
		this._store.dispatch(new Dashboard.UpdateCampaignsEffectivenessChartOptions(chartOptions));
	}

	/**
	 * @description Handles dispatching action for currently selected campaign for effectiveness report.
	 * @param selected
	 */
	updateSelectedCampaignEffectivenessReport(selected: SelectedCampaign): void {
		this._log.trace('[DashboardSandboxService] updateSelectedCampaignEffectivenessReport executing with id', this, selected.id);
		this._store.dispatch(new Dashboard.UpdateSelectedCampaignEffectivenessReport(selected));
	}

	/**
	 * @description Gets campaign by id.
	 * @param campaign
	 */
	getCampaignById(campaign: GetCampaign): void {
		this._log.trace('[DashboardSandboxService] getCampaignById executing');
		this._cacheService
			.getCampaignById$(campaign)
			.pipe(tap((campaign) => this._store.dispatch(new CampaignsActions.SetCampaignById(campaign))))
			.subscribe();
	}

	/**
	 * @description Gets campaigns by ids.
	 * @param campaigns
	 */
	getCampaignsByIds(campaigns: GetCampaigns): void {
		this._log.trace('[DashboardSandboxService] getCampaignById executing');
		this._cacheService
			.getCampaignByIds$(campaigns)
			.pipe(tap((camps) => this._store.dispatch(new CampaignsActions.SetUserCampaigns(camps))))
			.subscribe();
	}
}
