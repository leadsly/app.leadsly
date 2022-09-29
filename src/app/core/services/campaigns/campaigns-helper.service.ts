import { Injectable } from '@angular/core';
import { NewCampaign } from '../../models/campaigns/new-campaign';

/**
 * @description Campaigns service.
 */
@Injectable()
export class CampaignsHelperService {
	/**
	 * Creates an instance of campaigns service.
	 */
	constructor() {}

	/**
	 * @description Creates new campaign with all of the necessary properties.
	 * @param campaign
	 * @returns new campaign
	 */
	newCampaign(campaign: NewCampaign, connectedAccount: string, halId: string): NewCampaign {
		return {
			campaignDetails: {
				...campaign.campaignDetails,
				warmUp: false,
				primaryProspectList: {
					...campaign.campaignDetails.primaryProspectList
				}
			},
			messages: campaign.messages.map((msg, i) => {
				msg.order = i;
				return msg;
			}),
			connectedAccount: connectedAccount,
			halId: halId
		};
	}
}
