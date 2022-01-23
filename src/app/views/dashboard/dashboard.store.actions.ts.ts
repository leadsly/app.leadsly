import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';
import { CampaignsReport } from './../../core/models/reports/campaigns-report.model';

/**
 * Initializes campaigns effectiveness report.
 */
export class InitializeCampaignsEffectivenessReport {
	/**
	 * Type of action.
	 */
	static readonly type = '[Reports] Initializes Campaigns Effectiveness Reports';

	/**
	 * Creates an instance of users campaigns effectiveness reports.
	 * @param payload
	 */
	constructor(public payload: CampaignsReport) {}
}

/**
 * Updates campaigns effectiveness legend options.
 */
export class UpdateCampaignsEffectivenessChartOptions {
	/**
	 * Type of action.
	 */
	static readonly type = '[Reports] Update Campaigns Effectiveness Chart Options';

	/**
	 * Creates an instance of users campaigns effectiveness report.
	 * @param payload
	 */
	constructor(public payload: Partial<ChartOptionsApex>) {}
}

/**
 * Updates campaigns effectiveness legend options.
 */
export class UpdateCampaignsEffectivenessLegendChartOptions {
	/**
	 * Type of action.
	 */
	static readonly type = '[Reports] Update Campaigns Effectiveness Legend Chart Options';

	/**
	 * Creates an instance of users campaigns effectiveness report.
	 * @param payload
	 */
	constructor(public payload: { desktop: boolean }) {}
}
