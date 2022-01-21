import { ChartOptionsApex } from 'app/core/models/reports/chart-options.apex.model';
import { ChartOptions } from 'app/core/models/reports/chart-options.model';

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
	constructor(public payload: ChartOptions) {}
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
