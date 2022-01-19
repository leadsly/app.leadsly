import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptions } from 'app/core/models/reports/chart-options.apex.model';
import produce from 'immer';
import { DashboardStateModel } from './dashboard-state.model.ts';
import * as Dashboard from './dashboard.store.actions.ts';

const DASHBOARD_STATE_TOKEN = new StateToken<DashboardStateModel>('dashboard');

/**
 * @description Campaign state.
 */
@State<DashboardStateModel>({
	name: DASHBOARD_STATE_TOKEN,
	defaults: {
		overallReportOptions: {
			apex: {
				chart: {
					type: 'area',
					height: 0
				},
				dataLabels: {},
				series: [
					{
						data: []
					}
				],
				stroke: {},
				tooltip: {},
				xaxis: {}
			}
		}
	}
})
@Injectable()
export class DashboardState {
	@Selector()
	static getOverallReportOptions(state: DashboardStateModel): ChartOptions {
		return state.overallReportOptions;
	}

	constructor(private _log: LogService) {}

	@Action(Dashboard.SetOverallReportOptions)
	setOverallReportOptions(ctx: StateContext<DashboardStateModel>, action: Dashboard.SetOverallReportOptions): void {
		this._log.info('[DashboardState] Setting setOverallReportOptions.');
		ctx.setState(
			produce((draft: DashboardStateModel) => {
				draft.overallReportOptions = action.payload;
				return draft;
			})
		);
	}
}
