import { ChartDataApex } from './chart-data-apex.model';

/**
 * @description Charts options apex.
 */
export interface ChartsOptionsApex {
	/**
	 * @description Chart options.
	 */
	items: ChartDataApex[];

	/**
	 * @description The id of the selected chart.
	 */
	selected: string;
}
