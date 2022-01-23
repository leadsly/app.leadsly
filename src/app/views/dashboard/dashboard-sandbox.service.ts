import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';
import { DashboardAsyncService } from 'app/core/services/dashboard-async.service';
import { UsersAsyncService } from 'app/core/services/users-async.service';
import { Observable, tap } from 'rxjs';
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
	@Select(DashboardState.getCampaignsEffectivenessReports) campaignsEffectivenessReportIds$: Observable<string[]>;

	/**
	 * @description Selects id for the selected campaign effectiveness report.
	 */
	@Select(DashboardState.getCampaignsEffectivenessSelectedReport) campaignsEffectivenessSelectedReportId$: Observable<string>;

	/**
	 * @description Gets campaigns effectiveness by id.
	 */
	@Select(DashboardState.getCampaignsEffectivenessReportById) getCampaignsEffectivenessReportById$: Observable<
		(id: string) => {
			chartOptionsApex: ChartOptionsApex;
		}
	>;

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
		private _userAsyncService: UsersAsyncService,
		public router: Router
	) {}

	/**
	 * @description Gets user's campaigns effectiveness report
	 */
	getUserCampaignsEffectivenessReport(): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._userAsyncService
			.getCampaignsEffectivenessReports$(userId)
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
}
