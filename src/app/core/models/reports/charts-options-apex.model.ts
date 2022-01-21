import { ChartOptionsApex } from './chart-options.apex.model';

/**
 * @description Charts options apex.
 */
export interface ChartsOptionsApex {
	/**
	 * @description Chart options.
	 */
	items: ChartOptionsApex[];

	/**
	 * @description The id of the selected chart.
	 */
	selected: string;
}
