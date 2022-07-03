import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { InternalServerError } from 'app/core/error-handler/internal-server-error.decorator';
import { ProblemDetailsError } from 'app/core/error-handler/problem-details-error.decorator';
import { ConnectedInfo } from 'app/core/models/connected-info.model';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { LinkAccount } from 'app/core/models/profile/link-account.model';

import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';

import { VirtualAssistantInfo } from 'app/core/models/profile/virtual-assistant-info.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { Observable, shareReplay, tap } from 'rxjs';
import * as Leadsly from '../../core/leadsly/leadsly.store.actions';
import { LeadslyService } from '../../core/services/leadsly/leadsly.service';
import { LeadslyState } from './../../core/leadsly/leadsly.store.state';
import { TimezonesAsyncService } from './../../core/services/time-zones-async.service';

/**
 * @description Profile sandbox service
 */
@Injectable()
export class ProfileSandboxService {
	/**
	 * Emitted when server responds with 40X error.
	 */
	@ProblemDetailsError() problemDetails$: Observable<ProblemDetails>;

	/**
	 * Emitted when server responds with 50X error.
	 */
	@InternalServerError() internalServerErrorDetails$: Observable<InternalServerErrorDetails>;

	/**
	 * @description Selects whether user is connected to virtual assistant.
	 */
	@Select(LeadslyState.selectVirtualAssistantInfo) virtualAssistantInfo$: Observable<VirtualAssistantInfo>;

	/**
	 * @description Selects whether user has created a virtual assistant or not.
	 */
	@Select(LeadslyState.selectConnectedInfo) connectedInfo$: Observable<ConnectedInfo>;

	/**
	 * Creates an instance of profile sandbox service.
	 * @param _store
	 * @param _profileAsyncService
	 * @param _leadslyAsyncService
	 */
	constructor(
		public router: Router,
		private _store: Store,
		private _leadslyService: LeadslyService,
		private _timezonesAsyncService: TimezonesAsyncService
	) {}

	/**
	 * @description Gets supported time zones.
	 */
	getSupportedTimeZones$(): Observable<TimeZone[]> {
		return this._timezonesAsyncService.getAll$().pipe(
			tap((resp) => this._store.dispatch(new Leadsly.SetSupportedTimeZones({ timeZones: resp }))),
			shareReplay()
		);
	}

	/**
	 * @description Creates virtual assistant space in leadsly.
	 * @param model
	 */
	createVirtualAssistant(model: SetupVirtualAssistant): void {
		model.userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._leadslyService
			.createVirtualAssistant$(model)
			.pipe(tap((resp) => this._store.dispatch(new Leadsly.CreateVirtualAssistant({ assistant: resp }))))
			.subscribe();
	}

	/**
	 * @description Gets virtual assistant
	 * @returns virtual assistant
	 */
	getVirtualAssistantInfo$(): void {
		this._leadslyService
			.getVirtualAssistantInfo$()
			.pipe(tap((resp) => this._store.dispatch(new Leadsly.SetVirtualAssistantInfo({ virtualAssistantInfo: resp }))))
			.subscribe();
	}

	/**
	 * @description Gets connected info.
	 * @returns connected info
	 */
	getConnectedInfo$(): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._leadslyService
			.getConnectedAccountInfo$(userId)
			.pipe(tap((resp) => this._store.dispatch(new Leadsly.SetConnectedInfo({ connectedInfo: resp }))))
			.subscribe();
	}

	/**
	 * @description Connects linked in account.
	 * @param model
	 */
	connectLinkedInAccount$(model: LinkAccount): Observable<ConnectLinkedInAccountResult> {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		return this._leadslyService
			.connectLinkedInAccount$(userId, model)
			.pipe(
				tap((resp) => this._store.dispatch(new Leadsly.SetIsConnected({ isConnected: !resp.twoFactorAuthRequired && !resp.unexpectedErrorOccured })))
			);
	}
}
