import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { NotificationService } from 'app/core/core.module';

import { ConnectedInfo } from 'app/core/models/connected-info.model';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { DeleteVirtualAssistantResult } from 'app/core/models/profile/delete-virtual-assistant-result.model';
import { LinkAccount } from 'app/core/models/profile/link-account.model';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { TwoFactorAuthResult } from 'app/core/models/profile/two-factor-auth-result.model';
import { TwoFactorAuth } from 'app/core/models/profile/two-factor-auth.model';
import { VirtualAssistantInfo } from 'app/core/models/profile/virtual-assistant-info.model';
import { VirtualAssistant } from 'app/core/models/profile/virtual-assistant.model';
import { map, Observable, of, tap } from 'rxjs';
import * as Leadsly from '../../leadsly/leadsly.store.actions';
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
		private _linkedInAccountAsyncService: LinkedInAccountAsyncService,
		private _notificationService: NotificationService
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
	 * @description Deletes virtual assistant$
	 * @param virtualAssistantId
	 * @returns virtual assistant$
	 */
	deleteVirtualAssistant$(virtualAssistantId: string): Observable<DeleteVirtualAssistantResult> {
		return this._virtualAssistantAsyncService.delete$(virtualAssistantId);
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
	 * @description Gets connected account info after account link.
	 * @param userId
	 * @param result
	 * @returns connected account info after link$
	 */
	checkConnectLinkedInAccountResult$(userId: string, result: ConnectLinkedInAccountResult): Observable<ConnectLinkedInAccountResult> {
		this._log.debug('checkConnectLinkedInAccountResult$', this, result);
		if ((result.twoFactorAuthRequired === true || result.invalidCredentials === true) && result.unexpectedErrorOccured === false) {
			this._log.debug('checkConnectLinkedInAccountResult$. Returning result: ', this, result);
			return of(result);
		} else {
			this._log.debug('checkConnectLinkedInAccountResult$. Fetching ConnectedInfo', this);
			return this.getConnectedAccountInfo$(userId).pipe(
				tap((resp: ConnectedInfo) => this._store.dispatch(new Leadsly.SetConnectedInfo({ connectedInfo: resp }))),
				tap((_) => this._notificationService.success('LinkedIn account connected successfully.')),
				map((_) => result)
			);
		}
	}

	/**
	 * @description Checks enter two factor auth result.
	 * @param result
	 * @returns enter two factor auth result$
	 */
	checkEnterTwoFactorAuthResult$(userId: string, result: TwoFactorAuthResult): Observable<TwoFactorAuthResult> {
		this._log.debug('checkEnterTwoFactorAuthResult$', this, result);
		if (result.failedToEnterCode === false && result.invalidOrExpiredCode === false && result.unexpectedErrorOccured === false) {
			this._log.debug('checkEnterTwoFactorAuthResult$. Fetching ConnectedInfo', this);
			return this.getConnectedAccountInfo$(userId).pipe(
				tap((resp: ConnectedInfo) => this._store.dispatch(new Leadsly.SetConnectedInfo({ connectedInfo: resp }))),
				tap((_) => this._notificationService.success('LinkedIn account connected successfully.')),
				map((_) => result)
			);
		} else {
			this._log.debug('checkEnterTwoFactorAuthResult$. Returning result: ', this, result);
			return of(result);
		}
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

	/**
	 * @description Enters two factor auth code.
	 * @param userId
	 * @param model
	 * @returns two factor auth$
	 */
	enterTwoFactorAuth$(userId: string, model: TwoFactorAuth): Observable<TwoFactorAuthResult> {
		return this._linkedInAccountAsyncService.enterTwoFactorAuth$(userId, model);
	}
}
