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

@Injectable({
	providedIn: 'root'
})
export class DashboardSandboxService {
	@Select(DashboardState.getOverallReportOptions) overallReportOptions$: Observable<ChartOptions>;

	constructor(
		private _log: LogService,
		private _store: Store,
		private _dashboardAsyncService: DashboardAsyncService,
		private _userAsyncService: UsersAsyncService,
		public router: Router
	) {}

	getUserOverallReport(): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._userAsyncService
			.getOverallReport$(userId)
			.pipe(tap((options) => this._store.dispatch(new Dashboard.SetOverallReportOptions(options))))
			.subscribe();
	}
}
