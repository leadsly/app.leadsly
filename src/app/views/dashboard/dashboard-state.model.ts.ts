import { ChartOptions } from 'app/core/models/reports/chart-options.model';

/**
 * Dashboard state model.
 */
export interface DashboardStateModel {
	campaignEffectivenessReport: Partial<ChartOptions>;
}
