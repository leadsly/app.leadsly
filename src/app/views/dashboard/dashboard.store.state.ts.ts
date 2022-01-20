import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptions } from 'app/core/models/reports/chart-options.model';
import produce from 'immer';
import _ from 'lodash.merge';
import { DashboardStateModel } from './dashboard-state.model.ts';
import * as Dashboard from './dashboard.store.actions.ts';

const DASHBOARD_STATE_TOKEN = new StateToken<DashboardStateModel>('dashboard');

/**
 * @description Campaign state.
 */
@State<DashboardStateModel>({
	name: DASHBOARD_STATE_TOKEN,
	defaults: {
		campaignEffectivenessReport: {
			chartOptionsApex: {
				series: [
					{
						data: []
					}
				],
				chart: {
					height: 350,
					type: 'area'
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'smooth'
				},
				xaxis: {
					type: 'datetime',
					categories: []
				},
				tooltip: {
					x: {
						format: 'dd/MM/yy'
					}
				}
			}
		}
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
	 * @description Updates campaigns effectiveness report.
	 * @param ctx
	 * @param action
	 */
	@Action(Dashboard.UpdateCampaignsEffectivenessReport)
	updateCampaignsEffectivenessOptions(ctx: StateContext<DashboardStateModel>, action: Dashboard.UpdateCampaignsEffectivenessReport): void {
		this._log.info('[DashboardState] Updating updateCampaignsEffectivenessOptions.');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const updatedChartOptions = _(action.payload, ctx.getState().campaignEffectivenessReport);
		ctx.setState(
			produce((draft: DashboardStateModel) => {
				draft.campaignEffectivenessReport.chartOptionsApex = updatedChartOptions.chartOptionsApex;
				return draft;
			})
		);
	}

	/**
	 * @description Updates effectiveness report legend options.
	 * @param ctx
	 * @param action
	 */
	@Action(Dashboard.UpdateCampaignsEffectivenessLegendOptions)
	updateCampaignEffectivenessLegendOptions(
		ctx: StateContext<DashboardStateModel>,
		action: Dashboard.UpdateCampaignsEffectivenessLegendOptions
	): void {
		this._log.info('[DashboardState] Updating updateCampaignEffectivenessLegendOptions.');
		ctx.setState(
			produce((draft: DashboardStateModel) => {
				draft.campaignEffectivenessReport.chartOptionsApex.legend = action.payload.legend;
				return draft;
			})
		);
	}
}
