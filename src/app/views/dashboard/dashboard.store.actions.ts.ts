import { ChartOptions } from 'app/core/models/reports/chart-options.model';

/**
 * Get campaigns effectiveness report.
 */
export class SetCampaignsEffectivenessReport {
	/**
	 * Type of action.
	 */
	static readonly type = '[Reports] Set Campaigns Effectiveness Report';

	/**
	 * Creates an instance of overall report.
	 * @param payload
	 */
	constructor(public payload: Partial<ChartOptions>) {}
}
