import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { LeadslyAsyncService } from 'app/core/leadsly/leadsly-async.service';
import { Observable, tap } from 'rxjs';
import * as Leadsly from '../../core/leadsly/leadsly.store.actions';
import { ConnectedAccount } from '../models/connected-account';
import { OperationResponse } from '../models/operation-response.model';
import { NewCampaign } from './../models/campaigns/new-campaign';
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
	 */
	constructor(private _store: Store, private _leadslyAsyncService: LeadslyAsyncService) {}

	/**
	 * @description Creates new campaign with all of the necessary properties.
	 * @param campaign
	 * @returns new campaign
	 */
	createNewCampaign(campaign: NewCampaign): NewCampaign {
		const connectedAccount = this._store.selectSnapshot(LeadslyState.selectConnectedAccount);
		const halId = this._store.selectSnapshot(LeadslyState.selectHalId);
		console.log(campaign);
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

	/**
	 * @description Gets connected account
	 * @returns connected account$
	 */
	getConnectedAccount$(): Observable<OperationResponse> {
		return this._leadslyAsyncService
			.getConnectedAccount$()
			.pipe(tap((resp) => this._store.dispatch(new Leadsly.AddConnectedAccount({ leadslyDetails: resp.data as ConnectedAccount }))));
	}
}
