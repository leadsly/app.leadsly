import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { LeadslyAsyncService } from 'app/core/leadsly/leadsly-async.service';

import { LogService } from '../logger/log.service';

import { NewCampaign } from './../models/campaigns/new-campaign';
import { VirtualAssistantAsyncService } from './../services/virtual-assistant-async.service';
import { LeadslyState } from './leadsly.store.state';
/**
 * @description Service responsible for managing hal id, connected LinkedInAccount etc.
 */
@Injectable({
	providedIn: 'root'
})
export class LeadslyService {
	/**
	 * Creates an instance of leadsly service.
	 * @param _store
	 * @param _leadslyAsyncService
	 * * @param _log
	 */
	constructor(
		private _log: LogService,
		private _store: Store,
		private _leadslyAsyncService: LeadslyAsyncService,
		private _virtualAssistantAsyncService: VirtualAssistantAsyncService
	) {}

	/**
	 * @description Creates new campaign with all of the necessary properties.
	 * @param campaign
	 * @returns new campaign
	 */
	createNewCampaign(campaign: NewCampaign): NewCampaign {
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
