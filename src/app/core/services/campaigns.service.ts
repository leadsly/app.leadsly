import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { LeadslyState } from '../leadsly/leadsly.store.state';
import { NewCampaign } from '../models/campaigns/new-campaign';

/**
 * @description Campaigns service.
 */
@Injectable({
	providedIn: 'root'
})
export class CampaignsService {
	/**
	 * Creates an instance of campaigns service.
	 * @param _store
	 */
	constructor(private _store: Store) {}

	/**
	 * @description Creates new campaign with all of the necessary properties.
	 * @param campaign
	 * @returns new campaign
	 */
	newCampaign(campaign: NewCampaign): NewCampaign {
		const connectedAccount = this._store.selectSnapshot(LeadslyState.selectConnectedAccount);
		const halId = this._store.selectSnapshot(LeadslyState.selectHalId);
		return {
			campaignDetails: {
				...campaign.campaignDetails,
				warmUp: false,
				primaryProspectList: {
					...campaign.campaignDetails.primaryProspectList
				}
			},
			messages: campaign.messages.map((msg, i) => {
				msg.order = i + 1;
				return msg;
			}),
			connectedAccount: connectedAccount,
			halId: halId
		};
	}
}
