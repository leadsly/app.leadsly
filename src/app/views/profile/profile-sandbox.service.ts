import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { InternalServerError } from 'app/core/error-handler/internal-server-error.decorator';
import { ProblemDetailsError } from 'app/core/error-handler/problem-details-error.decorator';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { TimezonesAsyncService } from './../../core/services/time-zones-async.service';

import { ProblemDetails } from 'app/core/models/problem-details.model';
import { LeadslyConnectResult } from 'app/core/models/profile/leadsly-connect-result.model';
import { SetupLinkAccount } from 'app/core/models/profile/setup-link-account.model';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { LinkedInAccountAsyncService } from 'app/core/services/linkedin-account-async.service';
import { Observable, shareReplay, tap } from 'rxjs';
import * as Leadsly from '../../core/leadsly/leadsly.store.actions';
import { LeadslyService } from './../../core/leadsly/leadsly.service';
import { LeadslyState } from './../../core/leadsly/leadsly.store.state';
import { ConnectedAccount } from './../../core/models/connected-account';
import { VirtualAssistant } from './../../core/models/profile/virtual-assistant.model';
import { ProfileAsyncService } from './../../core/services/profile-async.service';
import { VirtualAssistantAsyncService } from './../../core/services/virtual-assistant-async.service';

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
	 * @description Selects user's linked accounts.
	 */
	@Select(LeadslyState.selectConnectedAccount) connectedAccount$: Observable<ConnectedAccount>;

	@Select(LeadslyState.selectIsConnected) isConnected$: Observable<boolean>;

	/**
	 * @description Selects user's setup result.
	 */
	@Select(LeadslyState.selectLeadslySetupResult) leadslySetupResult$: Observable<VirtualAssistant>;

	/**
	 * @description Selects user's connect result.
	 */
	@Select(LeadslyState.selectConnectedAccount) leadslyConnectResult$: Observable<LeadslyConnectResult>;

	/**
	 * Creates an instance of profile sandbox service.
	 * @param _store
	 * @param _profileAsyncService
	 * @param _leadslyAsyncService
	 */
	constructor(
		public router: Router,
		private _store: Store,
		private _profileAsyncService: ProfileAsyncService,
		private _virtualAssistantAsyncService: VirtualAssistantAsyncService,
		private _leadslyService: LeadslyService,
		private _timezonesAsyncService: TimezonesAsyncService,
		private _linkedInAccountAsyncService: LinkedInAccountAsyncService
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
		this._virtualAssistantAsyncService
			.create$(model)
			.pipe(tap((resp) => this._store.dispatch(new Leadsly.SetVirtualAssistant({ virtualAssistant: resp }))))
			.subscribe();
	}

	/**
	 * @description Gets virtual assistant
	 * @returns virtual assistant$
	 */
	getVirtualAssistant$(): Observable<VirtualAssistant> {
		return this._virtualAssistantAsyncService.get$().pipe(
			tap((resp) => this._store.dispatch(new Leadsly.SetVirtualAssistant({ virtualAssistant: resp }))),
			shareReplay()
		);
	}

	/**
	 * @description Connects linked in account.
	 * @param model
	 */
	connectLinkedInAccount(model: SetupLinkAccount): void {}
}
