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
import { LogService } from '../logger/log.service';
import { EmailChallengePinResult } from '../models/profile/email-challenge-pin-result.model';
import { EmailChallengePin } from '../models/profile/email-challenge-pin.model';
import * as Leadsly from './leadsly.store.actions';
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
	 * @description Creates virtual assistant.
	 * @param model
	 * @returns virtual assistant$
	 */
	createVirtualAssistant$(model: SetupVirtualAssistant): Observable<VirtualAssistant> {
		return this._virtualAssistantAsyncService.create$(model);
	}

	/**
	 * @description Gets virtual assistant info and sets it to store.
	 * @returns virtual assistant info$
	 */
	getVirtualAssistantInfo$(): Observable<VirtualAssistantInfo> {
		return this._virtualAssistantAsyncService
			.getInfo$()
			.pipe(tap((resp) => this._store.dispatch(new Leadsly.SetVirtualAssistantInfo({ virtualAssistantInfo: resp }))));
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
	 * @description Gets connected account info.
	 * @returns connected account info$
	 */
	getConnectedAccountInfo$(userId: string): Observable<ConnectedInfo> {
		return this._linkedInAccountAsyncService
			.getInfo$(userId)
			.pipe(tap((resp) => this._store.dispatch(new Leadsly.SetConnectedInfo({ connectedInfo: resp }))));
	}

	/**
	 * @description Gets connected account info after account link.
	 * @param userId
	 * @param result
	 * @returns connected account info after link$
	 */
	checkConnectLinkedInAccountResult$(userId: string, result: ConnectLinkedInAccountResult): Observable<ConnectLinkedInAccountResult> {
		this._log.debug('checkConnectLinkedInAccountResult$', this, result);
		if (
			(result.twoFactorAuthRequired === true ||
				result.invalidEmail === true ||
				result.invalidPassword === true ||
				result.emailPinChallenge === true) &&
			result.unexpectedErrorOccured === false
		) {
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
	 * @description Checks enter email challenge pin result.
	 * @param result
	 * @returns enter email challenge pin result
	 */
	checkEmailChallengePinResult$(userId: string, result: EmailChallengePinResult): Observable<EmailChallengePinResult> {
		this._log.debug('checkEmailChallengePinResult$', this, result);
		if (
			result.failedToEnterPin === false &&
			result.invalidOrExpiredPin === false &&
			result.unexpectedErrorOccured === false &&
			result.twoFactorAuthRequired === false
		) {
			this._log.debug('checkEmailChallengePinResult$. Fetching ConnectedInfo', this);
			return this.getConnectedAccountInfo$(userId).pipe(
				tap((resp: ConnectedInfo) => this._store.dispatch(new Leadsly.SetConnectedInfo({ connectedInfo: resp }))),
				tap((_) => this._notificationService.success('LinkedIn account connected successfully.')),
				map((_) => result)
			);
		} else {
			this._log.debug('checkEmailChallengePinResult$. Returning result: ', this, result);
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

	/**
	 * @description Enters two factor auth code.
	 * @param userId
	 * @param model
	 * @returns two factor auth$
	 */
	enterEmailChallengePin$(userId: string, model: EmailChallengePin): Observable<EmailChallengePinResult> {
		return this._linkedInAccountAsyncService.enterEmailChallengePin$(userId, model);
	}
}
