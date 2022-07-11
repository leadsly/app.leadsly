import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'app/core/auth/auth.store.state';
import { NotificationService } from 'app/core/core.module';
import { InternalServerError } from 'app/core/error-handler/internal-server-error.decorator';
import { ProblemDetailsError } from 'app/core/error-handler/problem-details-error.decorator';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { LinkAccount } from 'app/core/models/profile/link-account.model';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { TwoFactorAuthResult } from 'app/core/models/profile/two-factor-auth-result.model';
import { TwoFactorAuth } from 'app/core/models/profile/two-factor-auth.model';
import { VirtualAssistantInfo } from 'app/core/models/profile/virtual-assistant-info.model';
import { VirtualAssistant } from 'app/core/models/profile/virtual-assistant.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { filter, Observable, shareReplay, startWith, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LeadslyService } from '../../core/leadsly/leadsly.service';
import * as Leadsly from '../../core/leadsly/leadsly.store.actions';
import { LeadslyState } from './../../core/leadsly/leadsly.store.state';
import { ConnectedInfo } from './../../core/models/connected-info.model';
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
	 * @description Selects connect linked in account result.
	 */
	@Select(LeadslyState.selectConnectLinkedInAccountResult) connectLinkedInAccountResult$: Observable<ConnectLinkedInAccountResult>;

	/**
	 * @description Selects enter two factor auth result.
	 */
	@Select(LeadslyState.selectTwoFactorAuthResult) twoFactorAuthResult$: Observable<TwoFactorAuthResult>;

	/**
	 * Creates an instance of profile sandbox service.
	 * @param router
	 * @param _store
	 * @param _leadslyService
	 * @param _timezonesAsyncService
	 * @param _notificationService
	 */
	constructor(
		public router: Router,
		private _store: Store,
		private _leadslyService: LeadslyService,
		private _timezonesAsyncService: TimezonesAsyncService,
		private _notificationService: NotificationService
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
			.pipe(
				startWith(this._notificationService.info('This may take couple of minutes. Please wait.')),
				filter((val) => val !== undefined),
				tap((resp) => this._store.dispatch(new Leadsly.CreateVirtualAssistant({ assistant: resp as VirtualAssistant }))),
				tap((_) => this._notificationService.success('Virtual assistant created successfully.'))
			)
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
		this._leadslyService.getConnectedAccountInfo$(userId).subscribe();
	}

	/**
	 * @description Connects linked in account.
	 * @param model
	 */
	connectLinkedInAccount(model: LinkAccount): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._leadslyService
			.connectLinkedInAccount$(userId, model)
			.pipe(
				startWith(this._notificationService.info('Sending Credentials. Please wait.')),
				filter((val) => val !== undefined),
				tap((resp: ConnectLinkedInAccountResult) =>
					this._store.dispatch(new Leadsly.SetConnectLinkedInAccountResult({ connectLinkedInAccountResult: resp }))
				),
				switchMap((result: ConnectLinkedInAccountResult) => this._leadslyService.checkConnectLinkedInAccountResult$(userId, result))
			)
			.subscribe();
	}

	/**
	 * @description Enters two factor auth code.
	 * @param model
	 * @returns two factor auth$
	 */
	enterTwoFactorAuth(model: TwoFactorAuth): void {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		this._leadslyService
			.enterTwoFactorAuth$(userId, model)
			.pipe(
				startWith(this._notificationService.info('Sending Credentials. Please wait.')),
				filter((val) => val !== undefined),
				switchMap((result: TwoFactorAuthResult) => this._leadslyService.checkEnterTwoFactorAuthResult$(userId, result)),
				tap((resp: TwoFactorAuthResult) => this._store.dispatch(new Leadsly.SetTwoFactorAuthResult({ twoFactorAuthResult: resp })))
			)
			.subscribe();
	}

	/**
	 * @description Deletes virtual assistant.
	 * @returns virtual assistant$
	 */
	deleteVirtualAssistant(): void {
		const virtualAssistantId = this._store.selectSnapshot(LeadslyState.selectVirtualAssistantId);
		this._leadslyService
			.deleteVirtualAssistant$(virtualAssistantId)
			.pipe(
				startWith(this._notificationService.info('This may take couple of minutes. Please wait.')),
				filter((val) => val !== undefined),
				tap((_) => this._store.dispatch(new Leadsly.DeleteVirtualAssistant())),
				tap((_) => this._notificationService.success('Virtual assistant deleted successfully.'))
			)
			.subscribe();
	}
}
