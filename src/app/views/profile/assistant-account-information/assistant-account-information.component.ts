import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LdslyValidators } from 'app/core/form-validators/ldsly-validators';
import { LogService } from 'app/core/logger/log.service';
import { ConnectedInfo } from 'app/core/models/connected-info.model';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { LinkAccount } from 'app/core/models/profile/link-account.model';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';

import { VirtualAssistantInfo } from 'app/core/models/profile/virtual-assistant-info.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { filter, map, merge, Observable, tap } from 'rxjs';
import { ProfileSandboxService } from '../profile-sandbox.service';

/**
 * @description Virtual Assistant Account information component.
 */
@Component({
	selector: 'ldsly-assistant-account-information',
	templateUrl: './assistant-account-information.component.html',
	styleUrls: ['./assistant-account-information.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssistantAccountInformationComponent implements OnInit {
	/**
	 * @description Virtual assistant info.
	 */
	_virtualAssistantInfo$: Observable<VirtualAssistantInfo>;

	/**
	 * @description Connected info
	 */
	_connectedInfo$: Observable<ConnectedInfo>;

	/**
	 * @description Leadsly supported time zones.
	 */
	_timeZones$: Observable<TimeZone[]>;

	/**
	 * @description User's virtual assistant info.
	 */
	_virtualAssistantInfo: VirtualAssistantInfo;

	/**
	 * @description Virtual assistant setup form.
	 */
	_virtualAssistantSetupForm: FormGroup;

	/**
	 * @description Connect to virtual assistant form.
	 */
	_connectForm: FormGroup;

	/**
	 * @description Whether any server errors occured.
	 */
	_serverErrorOccured$: Observable<ProblemDetails | InternalServerErrorDetails>;

	/**
	 * @description Whether the link account expansion panel is disabled or not. Should only be enabled once user has successfully created virtual assistant.
	 */
	_isLinkAccountDisabled = false;

	/**
	 * @description Connect user's linked in account to virtual assistant result.
	 */
	_connectLinkedInAccountResult$: Observable<ConnectLinkedInAccountResult>;

	/**
	 * Emitted when server responds with 40X error.
	 */
	private _problemDetails$: Observable<ProblemDetails>;

	/**
	 * Emitted when server responds with 50X error.
	 */
	private _internalServerErrorDetails$: Observable<InternalServerErrorDetails>;

	/**
	 * Creates an instance of assistant account information component.
	 * @param _sb
	 */
	constructor(private _log: LogService, private _sb: ProfileSandboxService, private _fb: FormBuilder) {
		this._problemDetails$ = this._sb.problemDetails$;
		this._internalServerErrorDetails$ = this._sb.internalServerErrorDetails$;
	}

	/**
	 * @description NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._connectedInfo$ = this._getConnectedInfo$();
		this._virtualAssistantInfo$ = this._getVirtualAssistantInfo$();
		this._timeZones$ = this._sb.getSupportedTimeZones$();
		this._serverErrorOccured$ = this._hasServerErrorOccured$();
		this._sb.getConnectedInfo$();
		this._sb.getVirtualAssistantInfo$();
		this._initForms();
	}

	/**
	 * @description Event handler when user clicks to create a new virtual assistant.
	 * @param event
	 */
	_onVirtualAssistantRequested(event: SetupVirtualAssistant): void {
		this._log.debug('_onVirtualAssistantRequested', this, event);
		this._sb.createVirtualAssistant(event);
	}

	/**
	 * @description Event handler when user clicks to connect to their virtual assistant.
	 * @param event
	 */
	_onConnectToVirtualAssistant(event: LinkAccount): void {
		this._log.debug('_onConnectToVirtualAssistant', this, event);
		this._connectLinkedInAccountResult$ = this._sb.connectLinkedInAccount$(event).pipe(tap((resp) => this._createTwoFactorAuthForm(resp)));
	}

	/**
	 * @description Creates two factor auth control.
	 * @param resp
	 */
	private _createTwoFactorAuthForm(resp: ConnectLinkedInAccountResult): void {
		if (resp.twoFactorAuthRequired && !resp.unexpectedErrorOccured) {
			this._connectForm.addControl('twoFactorAuthCode', this._fb.control('', LdslyValidators.required));
		}
	}

	/**
	 * @description Event handler when user requests to disconnect from virtual assistant.
	 */
	_onDisconnectRequested(): void {
		this._log.debug('_onDisconnectRequested event handler fired', this);
		// this._sb.disconnectLinkedInAccount();
	}

	/**
	 * @description Event handler when user requests to delete virtual assistant.
	 */
	_onDeleteVirtualAssistantRequested(): void {
		this._log.debug('_onDeleteVirtualAssistantRequested', this);
	}

	/**
	 * @description Gets virtual assistant info and initializes the form.
	 * @returns virtual assistant info$
	 */
	private _getVirtualAssistantInfo$(): Observable<VirtualAssistantInfo> {
		return this._sb.virtualAssistantInfo$.pipe(
			tap((resp) => this._linkAccountDisabled(resp)),
			filter((resp) => resp?.assistant !== null),
			tap((resp) => this._virtualAssistantSetupForm.get('timezoneId').setValue(resp?.assistant?.timezoneId))
		);
	}

	/**
	 * @description Whether link account expansion panel should be disabled or not.
	 * @param virtualAssistantInfo
	 */
	private _linkAccountDisabled(virtualAssistantInfo: VirtualAssistantInfo): void {
		this._isLinkAccountDisabled = virtualAssistantInfo?.assistant === null;
	}

	/**
	 * @description Gets connected info.
	 * @returns connected info$
	 */
	private _getConnectedInfo$(): Observable<ConnectedInfo> {
		return this._sb.connectedInfo$.pipe(
			filter((resp) => resp?.connectedAccount !== null),
			tap((resp) => this._connectForm.get('username').setValue(resp?.connectedAccount?.email))
		);
	}

	/**
	 * @description Listens for server errors.
	 */
	private _hasServerErrorOccured$(): Observable<ProblemDetails | InternalServerErrorDetails> {
		return merge(this._problemDetails$, this._internalServerErrorDetails$).pipe(
			map((err) => {
				this._log.error('_hasServerErrorOccured', this, err);
				return err;
			})
		);
	}

	/**
	 * @description Initializes forms.
	 */
	private _initForms(): void {
		this._connectForm = this._createConnectForm();
		this._virtualAssistantSetupForm = this._createVirtualAssistantSetupForm();
	}

	/**
	 * @description Creates connect form.
	 * @returns connect form
	 */
	private _createConnectForm(email?: string): FormGroup {
		return this._fb.group({
			username: this._fb.control(email ? email : '', [LdslyValidators.required, LdslyValidators.email]),
			password: this._fb.control('', [LdslyValidators.required])
		});
	}

	/**
	 * @description Creates virtual assistant setup form.
	 * @returns virtual assistant setup form
	 */
	private _createVirtualAssistantSetupForm(timezoneId?: string): FormGroup {
		return this._fb.group({
			timezoneId: this._fb.control(timezoneId ? timezoneId : '', [LdslyValidators.required])
		});
	}
}
