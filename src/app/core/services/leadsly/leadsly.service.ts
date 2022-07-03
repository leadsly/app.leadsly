import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { LinkAccount } from 'app/core/models/profile/link-account.model';

import { ConnectedInfo } from 'app/core/models/connected-info.model';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { VirtualAssistantInfo } from 'app/core/models/profile/virtual-assistant-info.model';
import { VirtualAssistant } from 'app/core/models/profile/virtual-assistant.model';
import { Observable } from 'rxjs';

import { LogService } from '../../logger/log.service';
import { NewCampaign } from '../../models/campaigns/new-campaign';
import { LinkedInAccountAsyncService } from './linkedin-account-async.service';
import { VirtualAssistantAsyncService } from './virtual-assistant-async.service';

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
		private _virtualAssistantAsyncService: VirtualAssistantAsyncService,
		private _linkedInAccountAsyncService: LinkedInAccountAsyncService
	) {}

	/**
	 * @description Creates new campaign with all of the necessary properties.
	 * @param campaign
	 * @returns new campaign
	 */
	createNewCampaign(campaign: NewCampaign): NewCampaign {
		return {} as NewCampaign;
		// const connectedAccount = this._store.selectSnapshot(LeadslyState.selectConnectedAccount);
		// const halId = this._store.selectSnapshot(LeadslyState.selectHalId);
		// return {
		// 	campaignDetails: {
		// 		...campaign.campaignDetails,
		// 		warmUp: false,
		// 		primaryProspectList: {
		// 			...campaign.campaignDetails.primaryProspectList
		// 		}
		// 	},
		// 	messages: campaign.messages.map((msg, i) => {
		// 		msg.order = i + 1;
		// 		return msg;
		// 	}),
		// 	connectedAccount: connectedAccount,
		// 	halId: halId
		// };
	}

	/**
	 * @description Creates virtual assistant.
	 * @param model
	 * @returns virtual assistant$
	 */
	createVirtualAssistant$(model: SetupVirtualAssistant): Observable<VirtualAssistant> {
		return this._virtualAssistantAsyncService.create$(model);
	}

	/**
	 * @description Gets virtual assistant info.
	 * @returns virtual assistant info$
	 */
	getVirtualAssistantInfo$(): Observable<VirtualAssistantInfo> {
		return this._virtualAssistantAsyncService.getInfo$();
	}

	/**
	 * @description Gets connected account info.
	 * @returns connected account info$
	 */
	getConnectedAccountInfo$(userId: string): Observable<ConnectedInfo> {
		return this._linkedInAccountAsyncService.getInfo$(userId);
	}

	/**
	 * @description Connects user's account to linked in.
	 * @param userId
	 * @param model
	 * @returns linked in account$
	 */
	connectLinkedInAccount$(userId: string, model: LinkAccount): Observable<ConnectLinkedInAccountResult> {
		return this._linkedInAccountAsyncService.connect$(userId, model);
	}
}
