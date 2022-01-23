import { ChartDataApex } from './apex-charts/chart-data-apex.model';

/**
 * @description Campaigns report.
 */
export interface CampaignsReport {
	/**
	 * @description Selected campaign id.
	 */
	selectedCampaignId: string;
	/**
	 * @description Chart options.
	 */
	items: ChartDataApex[];
}
