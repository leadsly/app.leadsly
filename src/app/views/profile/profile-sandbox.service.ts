import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LeadslyService } from './../../core/leadsly/leadsly.service';

import { Router } from '@angular/router';
import { InternalServerError } from 'app/core/error-handler/internal-server-error.decorator';
import { ProblemDetailsError } from 'app/core/error-handler/problem-details-error.decorator';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { OperationResponse } from 'app/core/models/operation-response.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { LeadslyConnectResult } from 'app/core/models/profile/leadsly-connect-result.model';
import { SetupLinkAccount } from 'app/core/models/profile/setup-link-account.model';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { map, Observable, shareReplay, tap } from 'rxjs';
import * as Leadsly from '../../core/leadsly/leadsly.store.actions';
import { LeadslyState } from './../../core/leadsly/leadsly.store.state';
import { ConnectedAccount } from './../../core/models/connected-account';
import { LeadslySetupResult } from './../../core/models/profile/leadsly-setup-result.model';
import { ProfileAsyncService } from './../../core/services/profile-async.service';

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

	/**
	 * @description Selects user's setup result.
	 */
	@Select(LeadslyState.selectLeadslySetupResult) leadslySetupResult$: Observable<LeadslySetupResult>;

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
		private _leadslyService: LeadslyService
	) {}

	/**
	 * @description Gets supported time zones.
	 */
	getSupportedTimeZones$(): Observable<TimeZone[]> {
		return this._profileAsyncService.getSupportedTimeZones$().pipe(
			tap((resp: OperationResponse) => this._store.dispatch(new Leadsly.SetSupportedTimeZones({ timeZones: resp.data as TimeZone[] }))),
			map((resp) => resp.data as TimeZone[]),
			shareReplay()
		);
	}

	/**
	 * @description Creates virtual assistant space in leadsly.
	 * @param model
	 */
	createVirtualAssistant(model: SetupVirtualAssistant): void {
		this._leadslyService
			.setupVirtualAssistant$(model)
			.pipe(tap((resp) => this._store.dispatch(new Leadsly.VirtualAssistantSetupResult({ setup: resp.data as LeadslySetupResult }))))
			.subscribe();
	}

	/**
	 * @description Connects linked in account.
	 * @param model
	 */
	connectLinkedInAccount(model: SetupLinkAccount): void {
		this._leadslyService
			.connectLinkedInAccount$(model)
			.pipe(tap((resp) => this._store.dispatch(new Leadsly.ConnectAccountSetupResult({ connect: resp.data as LeadslyConnectResult }))))
			.subscribe();
	}
}
