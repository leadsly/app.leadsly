import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';
import { SelectedCampaign } from 'app/core/models/reports/selected-campaign.model';
import { CampaignsReport } from './../../core/models/reports/campaigns-report.model';

/**
 * Initializes campaigns effectiveness report.
 */
export class InitializeCampaignsEffectivenessReport {
	/**
	 * Type of action.
	 */
	static readonly type = '[Reports] Initializes Campaigns Effectiveness Reports';

	/**
	 * Creates an instance of users campaigns effectiveness reports.
	 * @param payload
	 */
	constructor(public payload: CampaignsReport) {}
}

/**
 * Updates campaigns effectiveness legend options.
 */
export class UpdateCampaignsEffectivenessChartOptions {
	/**
	 * Type of action.
	 */
	static readonly type = '[Reports] Update Campaigns Effectiveness Chart Options';

	/**
	 * Creates an instance of users campaigns effectiveness report.
	 * @param payload
	 */
	constructor(public payload: Partial<ChartOptionsApex>) {}
}

/**
 * Updates currently selected campaign for campaign effectiveness report.
 */
export class UpdateSelectedCampaignEffectivenessReport {
	/**
	 * Type of action.
	 */
	static readonly type = '[Reports] Update Selected Campaign Effectiveness Report';

	/**
	 * Creates an instance of users campaigns effectiveness report.
	 * @param payload
	 */
	constructor(public payload: SelectedCampaign) {}
}
