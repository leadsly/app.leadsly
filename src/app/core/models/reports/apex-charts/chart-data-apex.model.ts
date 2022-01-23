import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';
export type ChartDataApex = ChartOptionsApex & {
	campaignId: string;
};
