import { ChartDataApex } from 'app/core/models/reports/apex-charts/chart-data-apex.model';
import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';

/**
 * Dashboard state model.
 */
export interface DashboardStateModel {
	generalReport: {
		/**
		 * @description Chart options.
		 */
		items: {
			/**
			 * @description Apex Charts specific information
			 */
			apexCharts: {
				/**
				 * @description List of ids of campaigns effectiveness reports
				 */
				ids: string[];
				/**
				 * @description Campaigns effectiveness reports data
				 */
				chartDataApex: {
					[id: string]: ChartDataApex;
				};
				/**
				 * @description Campaigns effectiveness options.
				 */
				chartOptionsApex: ChartOptionsApex;
			};
		};

		/**
		 * @description The id of the selected chart.
		 */
		selected: string;
		dateRange: {
			start: Date;
			end: Date;
		};
	};
}
