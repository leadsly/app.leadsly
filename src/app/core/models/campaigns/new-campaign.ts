import { CampaignDetails } from './campaign-details';
import { CampaignMessage } from './campaign-message';

/**
 * @description New campaign model.
 */
export interface NewCampaign {
	/**
	 * @description Email of the LinkedIn connected account.
	 */
	connectedAccount?: string;

	/**
	 * @description Hal id.
	 */
	halId?: string;

	/**
	 * @description Details about the campaign.
	 */
	campaignDetails: CampaignDetails;

	/**
	 * @description Campaign messages.
	 */
	messages: CampaignMessage[];
}
