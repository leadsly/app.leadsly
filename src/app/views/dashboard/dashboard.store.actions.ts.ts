import { ChartOptionsLegend } from 'app/core/models/reports/chart-options-legend.model';
import { ChartOptions } from 'app/core/models/reports/chart-options.model';

/**
 * Updates campaigns effectiveness report.
 */
export class UpdateCampaignsEffectivenessReport {
	/**
	 * Type of action.
	 */
	static readonly type = '[Reports] Update Campaigns Effectiveness Report';

	/**
	 * Creates an instance of users campaigns effectiveness report.
	 * @param payload
	 */
	constructor(public payload: Partial<ChartOptions>) {}
}

/**
 * Updates campaigns effectiveness legend options.
 */
export class UpdateCampaignsEffectivenessLegendOptions {
	/**
	 * Type of action.
	 */
	static readonly type = '[Reports] Update Campaigns Effectiveness Legend Options';

	/**
	 * Creates an instance of users campaigns effectiveness report.
	 * @param payload
	 */
	constructor(public payload: ChartOptionsLegend) {}
}
