import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { LogService } from 'app/core/logger/log.service';
import { Campaign } from 'app/core/models/campaigns/campaign.model';
import { GetCampaign } from 'app/core/models/campaigns/get-campaign.model';
import { ChartDataApex } from 'app/core/models/reports/apex-charts/chart-data-apex.model';

import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';
import { CampaignsReport } from 'app/core/models/reports/campaigns-report.model';
import { SelectedCampaign } from 'app/core/models/reports/selected-campaign.model';
import { ReportsAsyncService } from 'app/core/services/reports/report-async.service';
import { UsersAsyncService } from 'app/core/services/users-async.service';
import { filter, forkJoin, iif, Observable, of, switchMap, tap } from 'rxjs';
import { CampaignsAsyncService } from '../../core/services/campaigns/campaigns-async.service';
import * as CampaignsActions from '../campaigns/campaigns.store.actions';
import { CampaignsState } from '../campaigns/campaigns.store.state';
import { CacheService } from './../../core/services/cache.service';
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
	// @Select(DashboardState.getCampaignsIdsUsedForReport) campaignsIdsUsedForReport$: Observable<string[]>;

	/**
	 * @description Selects id for the selected campaign effectiveness report.
	 */
	@Select(DashboardState.getSelectedCampaignId) selectedCampaignId$: Observable<string>;

	/**
	 * @description Gets campaigns effectiveness by id.
	 */
	@Select(DashboardState.selectGeneralReportByCampaignId) selectGeneralReportByCampaignId$: Observable<
		(id: string) => {
			chartOptionsApex: ChartOptionsApex;
		}
	>;

	/**
	 * @description Gets users campaigns.
	 */
	@Select(CampaignsState.selectCampaigns) campaigns$: Observable<Campaign[]>;

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
		private _campaignAsyncService: CampaignsAsyncService,
		private _userAsyncService: UsersAsyncService,
		private _reportAsyncService: ReportsAsyncService,
		private _cacheService: CacheService,
		public router: Router
	) {}

	/**
	 * @description Gets users general report
	 */
	getGeneralReport(): void {
		this._store
			.selectOnce(DashboardState.selectCampaignGeneralReport)
			.pipe(
				switchMap((report) => {
					return iif(() => Object.keys(report).length === 0, this._getGeneralReport$(), of(report));
				})
			)
			.subscribe();
	}

	/**
	 * @description Fetches campaigns general report.
	 * @returns general report$
	 */
	private _getGeneralReport$(): Observable<{ [id: string]: ChartDataApex }> {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		return this._reportAsyncService.getGeneralReport$().pipe(
			filter((resp) => resp.items.length !== 0),
			tap((report: CampaignsReport) => this._store.dispatch(new Dashboard.SetCampaignsGeneralReport(report))),
			switchMap((report) =>
				this._getCampaignsByIds$(
					report.items.map((x) => x.campaignId),
					userId
				)
			),
			switchMap((_) => this._store.selectOnce(DashboardState.selectCampaignGeneralReport))
		);
	}

	/**
	 * @description Fetches campaigns by ids.
	 * @param ids
	 * @param userId
	 * @returns campaigns by ids$
	 */
	private _getCampaignsByIds$(ids: string[], userId: string): Observable<Campaign[]> {
		return forkJoin(
			// grab all of the campaign ids and fetch the campaigns
			ids.map((campaignId) =>
				this._campaignAsyncService
					.getById$(campaignId, userId)
					.pipe(tap((campaign) => this._store.dispatch(new CampaignsActions.Create({ campaign: campaign }))))
			)
		);
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
	updateSelectedGeneralReport(selected: SelectedCampaign): void {
		this._log.trace('[DashboardSandboxService] updateSelectedGeneralReport executing with id', this, selected.id);
		this._store.dispatch(new Dashboard.UpdateSelectedGeneralReport(selected));
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
	// getCampaignsByIds(campaigns: GetCampaigns): void {
	// 	this._log.trace('[DashboardSandboxService] getCampaignById executing');
	// 	this._cacheService
	// 		.getCampaignByIds$(campaigns)
	// 		.pipe(tap((camps) => this._store.dispatch(new CampaignsActions.SetUserCampaigns(camps))))
	// 		.subscribe();
	// }
}
