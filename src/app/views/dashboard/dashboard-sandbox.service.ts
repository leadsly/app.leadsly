import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptions } from 'app/core/models/reports/chart-options.model';
import { DashboardAsyncService } from 'app/core/services/dashboard-async.service';
import { UsersAsyncService } from 'app/core/services/users-async.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
	@Select(DashboardState.getCampaignsEffectivenessReport) campaignsEffectivenessReport$: Observable<Partial<ChartOptions>>;

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
	getUserOverallReport(): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._userAsyncService
			.getCampaignsEffectivenessReport$(userId)
			.pipe(tap((options) => this._store.dispatch(new Dashboard.SetCampaignsEffectivenessReport(options))))
			.subscribe();
	}
}
