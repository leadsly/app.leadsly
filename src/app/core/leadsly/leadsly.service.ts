import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { LeadslyAsyncService } from 'app/core/leadsly/leadsly-async.service';
import { filter, Observable, tap } from 'rxjs';
import * as Leadsly from '../../core/leadsly/leadsly.store.actions';
import { LogService } from '../logger/log.service';
import { ConnectedAccount } from '../models/connected-account';
import { OperationResponse } from '../models/operation-response.model';
import { SetupLinkAccount } from '../models/profile/setup-link-account.model';
import { SetupVirtualAssistant } from '../models/profile/setup-virtual-assistant.model';
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
	 * * @param _log
	 */
	constructor(private _log: LogService, private _store: Store, private _leadslyAsyncService: LeadslyAsyncService) {}

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

	/**
	 * @description Gets connected account
	 * @returns connected account$
	 */
	getConnectedAccount$(): Observable<OperationResponse> {
		return this._leadslyAsyncService.getConnectedAccount$().pipe(
			filter((resp) => resp.data !== null),
			tap((resp) => this._store.dispatch(new Leadsly.AddConnectedAccount({ leadslyDetails: resp.data as ConnectedAccount })))
		);
	}

	/**
	 * @description Setups virtual assistant.
	 * @param model
	 * @returns virtual assistant$
	 */
	setupVirtualAssistant$(model: SetupVirtualAssistant): Observable<OperationResponse> {
		const setupModel: SetupVirtualAssistant = {
			...model,
			socialAccountType: 'LinkedIn',
			userId: this._store.selectSnapshot(AuthState.selectCurrentUserId)
		};
		this._log.debug('[setupVirtualAssistant$] executed and the following model will be sent to the server', this, setupModel);
		return this._leadslyAsyncService.createVirtualAssistant$(setupModel).pipe();
	}

	/**
	 * @description Connects linked in account.
	 * @param model
	 * @returns linked in account$
	 */
	connectLinkedInAccount$(model: SetupLinkAccount): Observable<OperationResponse> {
		const setupModel: SetupLinkAccount = {
			...model,
			socialAccountType: 'LinkedIn',
			browserPurpose: 'Auth',
			userId: this._store.selectSnapshot(AuthState.selectCurrentUserId)
		};
		this._log.debug('[connectLinkedInAccount$] executed and the following model will be sent to the server', this, setupModel);
		return this._leadslyAsyncService.connectLinkedInAccount$(setupModel);
	}
}
