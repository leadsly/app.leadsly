import { ChartOptionsApex } from 'app/core/models/reports/chart-options.apex.model';
export type ChartDataApex = ChartOptionsApex & {
	campaignId: string;
	campaignName: string;
};
