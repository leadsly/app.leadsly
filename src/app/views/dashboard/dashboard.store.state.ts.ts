import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';
import produce from 'immer';
import clonedeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import { normalize } from 'normalizr';
import { ChartDataApex } from './../../core/models/reports/apex-charts/chart-data-apex.model';
import { effectivenessReportsSchema } from './dashboard-normalizr.schema';
import { DashboardStateModel } from './dashboard-state.model.ts';
import * as Dashboard from './dashboard.store.actions.ts';

const DASHBOARD_STATE_TOKEN = new StateToken<DashboardStateModel>('dashboard');

/**
 * @description Campaign state.
 */
@State<DashboardStateModel>({
	name: DASHBOARD_STATE_TOKEN,
	defaults: {
		campaignEffectivenessReports: {
			selected: '0',
			items: {
				apexCharts: {
					ids: [],
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
						},
						legend: {
							position: 'top',
							horizontalAlign: 'left'
						}
					},
					chartDataApex: {}
				}
			}
		}
	}
})
@Injectable()
export class DashboardState {
	/**
	 * @description Selects campaigns effectiveness report.
	 * @param state
	 * @returns campaigns effectiveness report
	 */
	@Selector()
	static getCampaignsIdsUsedForReport(state: DashboardStateModel): string[] {
		return state.campaignEffectivenessReports.items.apexCharts.ids;
	}

	/**
	 * @description Selects selected campaign effectiveness report id.
	 * @param state
	 * @returns campaigns effectiveness selected report
	 */
	@Selector()
	static getSelectedCampaignId(state: DashboardStateModel): string {
		return state.campaignEffectivenessReports.selected;
	}

	/**
	 * @description Determines whether or not campaigns effectiveness data has been fetched.
	 * @param state
	 * @returns true if campaign effectiveness data been fetched
	 */
	@Selector()
	static getCampaignEffectivenessReportData(state: DashboardStateModel): { [id: string]: ChartDataApex } {
		return state.campaignEffectivenessReports.items.apexCharts.chartDataApex;
	}

	/**
	 * @description Selects campaign effectiveness report by id.
	 * @param state
	 * @returns campaigns effectiveness report by id
	 */
	@Selector()
	static getEffectivenessReportByCampaignId(state: DashboardStateModel): (id: string) => { chartOptionsApex: ChartOptionsApex } {
		return (id: string): { chartOptionsApex: ChartOptionsApex } => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			const data = clonedeep(state.campaignEffectivenessReports.items.apexCharts.chartDataApex[id]);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			const options = clonedeep(state.campaignEffectivenessReports.items.apexCharts.chartOptionsApex);
			return {
				chartOptionsApex: merge(data, options)
			};
		};
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
	@Action(Dashboard.InitializeCampaignsEffectivenessReport)
	initializeCampaignsEffectivenessOptions(ctx: StateContext<DashboardStateModel>, action: Dashboard.InitializeCampaignsEffectivenessReport): void {
		this._log.info('[DashboardState] Updating updateCampaignsEffectivenessOptions.');
		const normalizedData = normalize(action.payload.items, [effectivenessReportsSchema]);
		const effectivenessReportsData = normalizedData.entities['effectivenessReports'];
		const campaignIds = normalizedData.result as string[];
		ctx.setState(
			produce((draft: DashboardStateModel) => {
				draft.campaignEffectivenessReports.items.apexCharts.chartDataApex = effectivenessReportsData;
				draft.campaignEffectivenessReports.items.apexCharts.ids = campaignIds;
				draft.campaignEffectivenessReports.selected = action.payload.selectedCampaignId;
			})
		);
	}

	/**
	 * @description Updates effectiveness report legend options.
	 * @param ctx
	 * @param action
	 */
	@Action(Dashboard.UpdateCampaignsEffectivenessChartOptions)
	updateCampaignEffectivenessChartOptions(ctx: StateContext<DashboardStateModel>, action: Dashboard.UpdateCampaignsEffectivenessChartOptions): void {
		this._log.info('[DashboardState] Updating updateCampaignEffectivenessChartOptions.');
		const chartOptionsClone = clonedeep(ctx.getState().campaignEffectivenessReports.items.apexCharts.chartOptionsApex);
		const updatedChartOptions = merge(chartOptionsClone, action.payload);
		ctx.setState(
			produce((draft: DashboardStateModel) => {
				draft.campaignEffectivenessReports.items.apexCharts.chartOptionsApex = updatedChartOptions;
			})
		);
	}

	/**
	 * @description Updates currently selected effectiveness report.
	 * @param ctx
	 * @param action
	 */
	@Action(Dashboard.UpdateSelectedCampaignEffectivenessReport)
	updateSelectedCampaignEffectivenessReport(
		ctx: StateContext<DashboardStateModel>,
		action: Dashboard.UpdateSelectedCampaignEffectivenessReport
	): void {
		this._log.info('[DashboardState] Updating updateSelectedCampaignEffectivenessReport.');
		ctx.setState(
			produce((draft: DashboardStateModel) => {
				draft.campaignEffectivenessReports.selected = action.payload.id;
			})
		);
	}
}
