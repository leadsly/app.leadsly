import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptions } from 'app/core/models/reports/chart-options.model';
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
		campaignEffectivenessReport: undefined
	}
})
@Injectable()
export class DashboardState {
	/**
	 * @description Selector for campaigns effectiveness report.
	 * @param state
	 * @returns campaigns effectiveness report
	 */
	@Selector()
	static getCampaignsEffectivenessReport(state: DashboardStateModel): Partial<ChartOptions> {
		return state.campaignEffectivenessReport;
	}

	/**
	 * Creates an instance of dashboard state.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Sets campaigns effectiveness report.
	 * @param ctx
	 * @param action
	 */
	@Action(Dashboard.SetCampaignsEffectivenessReport)
	setOverallReportOptions(ctx: StateContext<DashboardStateModel>, action: Dashboard.SetCampaignsEffectivenessReport): void {
		this._log.info('[DashboardState] Setting setOverallReportOptions.');
		ctx.setState(
			produce((draft: DashboardStateModel) => {
				draft.campaignEffectivenessReport = action.payload;
				return draft;
			})
		);
	}
}
