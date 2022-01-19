import { ChartOptions } from 'app/core/models/reports/chart-options.model';

/**
 * Get overall report.
 */
export class SetOverallReportOptions {
	/**
	 * Type of action.
	 */
	static readonly type = '[Reports] Get Overall Report';

	/**
	 * Creates an instance of overall report.
	 * @param payload
	 */
	constructor(public payload: ChartOptions) {}
}
