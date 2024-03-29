import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LdslyValidators } from 'app/core/form-validators/ldsly-validators';
import { LogService } from 'app/core/logger/log.service';
import { ConnectedInfo } from 'app/core/models/connected-info.model';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { EmailChallengePinResult } from 'app/core/models/profile/email-challenge-pin-result.model';
import { EmailChallengePin } from 'app/core/models/profile/email-challenge-pin.model';
import { LinkAccount } from 'app/core/models/profile/link-account.model';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { TwoFactorAuthResult } from 'app/core/models/profile/two-factor-auth-result.model';
import { TwoFactorAuth } from 'app/core/models/profile/two-factor-auth.model';
import { VirtualAssistantInfo } from 'app/core/models/profile/virtual-assistant-info.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { LDSLY_GLOBAL_CONTENT_MARGIN } from 'app/shared/global-settings/global-settings';
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
	 * @description Connect LinkedIn account to virtual assistant form.
	 */
	_connectForm: FormGroup;

	/**
	 * @description Connected LinkedIn account.
	 */
	_connectedForm: FormGroup;

	/**
	 * @description Whether any server errors occured.
	 */
	_serverErrorOccured$: Observable<ProblemDetails | InternalServerErrorDetails>;

	/**
	 * @description Whether the link account expansion panel is disabled or not. Should only be enabled once user has successfully created virtual assistant.
	 */
	_isLinkAccountDisabled: VirtualAssistantInfo;

	/**
	 * @description Connect user's linked in account to virtual assistant result.
	 */
	_connectLinkedInAccountResult$: Observable<ConnectLinkedInAccountResult>;

	/**
	 * @description Result of the two factor auth operation.
	 */
	_twoFactorAuthResult$: Observable<TwoFactorAuthResult>;

	/**
	 * @description Result of the email challenge pin operation.
	 */
	_emailChallengePinResult$: Observable<EmailChallengePinResult>;

	/**
	 * Margin at the bottom of this page
	 */
	readonly _contentMarginBottom = LDSLY_GLOBAL_CONTENT_MARGIN;

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
	constructor(private _log: LogService, private _sb: ProfileSandboxService, private _fb: FormBuilder, private _cd: ChangeDetectorRef) {
		this._problemDetails$ = _sb.problemDetails$;
		this._internalServerErrorDetails$ = _sb.internalServerErrorDetails$;
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
		this._setConnectLinkedInAccountResultStream();
		this._setTwoFactorAuthResultStream();
		this._setEmailChallengePinResultStream();
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
		this._sb.connectLinkedInAccount(event);
	}

	/**
	 * @description Event handler when user requests to disconnect from virtual assistant.
	 */
	_onDisconnectRequested(): void {
		this._log.debug('_onDisconnectRequested event handler fired', this);
		this._log.warn('Disconnecting account is not yet implemented!', this);
	}

	/**
	 * @description Event handler when user enters two factor auth code.
	 * @param event
	 */
	_onTwoFactorAuthCodeEntered(event: TwoFactorAuth): void {
		this._log.debug('_onTwoFactorAuthCodeEntered event handler fired', this, event);
		this._sb.enterTwoFactorAuth(event);
	}

	/**
	 * @description Event handler when user enters email challenge pin.
	 * @param event
	 */
	_emailChallengePinEntered(event: EmailChallengePin): void {
		this._log.debug('_emailChallengePinEntered event handler fired', this, event);
		this._sb.enterEmailChallengePin(event);
	}

	/**
	 * @description Event handler when user requests to delete virtual assistant.
	 */
	_onDeleteVirtualAssistantRequested(): void {
		this._log.debug('_onDeleteVirtualAssistantRequested', this);
		this._sb.deleteVirtualAssistant();
	}

	/**
	 * @description Sets two factor auth result stream.
	 */
	private _setTwoFactorAuthResultStream(): void {
		this._log.debug('_setTwoFactorAuthResultStream', this);
		this._twoFactorAuthResult$ = this._sb.twoFactorAuthResult$.pipe(
			filter((resp) => {
				this._log.debug('_setTwoFactorAuthResultStream filter', this, resp);
				return !!resp;
			}),
			tap((resp) => this._updateFormAfterTwoFactorAuth(resp))
		);
	}

	/**
	 * @description Sets email challenge pin result stream.
	 */
	private _setEmailChallengePinResultStream(): void {
		this._log.debug('_setEmailChallengePinResultStream', this);
		this._emailChallengePinResult$ = this._sb.emailChallengePinResult$.pipe(
			filter((resp) => {
				this._log.debug('_setEmailChallengePinResultStream filter', this, resp);
				return !!resp;
			}),
			tap((resp) => this._updateFormAfterEmailChallengePin(resp))
		);
	}

	/**
	 * @description Sets connect linked in account result stream.
	 */
	private _setConnectLinkedInAccountResultStream(): void {
		this._log.debug('_setConnectLinkedInAccountResultStream', this);
		this._connectLinkedInAccountResult$ = this._sb.connectLinkedInAccountResult$.pipe(
			filter((resp) => {
				this._log.debug('_setConnectLinkedInAccountResultStream', this, resp);
				return !!resp;
			}),
			tap((resp) => this._updateFormAfterConnect(resp))
		);
	}

	/**
	 * @description Updates form after link account operation.
	 * @param resp
	 */
	private _updateFormAfterConnect(resp: ConnectLinkedInAccountResult): void {
		this._log.debug('_updateFormAfterConnect', this, resp);
		if (resp.twoFactorAuthRequired && !resp.unexpectedErrorOccured) {
			this._addCodeControl();
		}

		if (resp.emailPinChallenge && !resp.unexpectedErrorOccured) {
			this._connectForm.addControl('emailChallengePin', this._fb.control('', LdslyValidators.required));
			// used to trigger message display
			this._connectForm.get('emailChallengePin').markAsDirty();
		}

		if (resp.invalidEmail && !resp.unexpectedErrorOccured) {
			this._connectForm.get('username').setErrors({
				invalidLinkedInEmail: true
			});
		}

		if (resp.invalidPassword && !resp.unexpectedErrorOccured) {
			this._connectForm.get('password').setErrors({
				invalidLinkedInPassword: true
			});
		}
	}

	/**
	 * @description Adds code control to connectForm.
	 */
	private _addCodeControl(): void {
		this._connectForm.addControl('code', this._fb.control('', LdslyValidators.required));
		this._connectForm.get('code').markAsDirty();
	}

	/**
	 * @description Updates form after two factor auth operation.
	 * @param resp
	 */
	private _updateFormAfterTwoFactorAuth(resp: TwoFactorAuthResult): void {
		this._log.debug('_updateFormAfterTwoFactorAuth', this, resp);
		if (resp.invalidOrExpiredCode && !resp.unexpectedErrorOccured) {
			this._log.debug('_updateFormAfterTwoFactorAuth invalid or expired code', this);
			this._connectForm.get('code').setErrors({
				invalidOrExpiredCode: true
			});
		}

		if (resp.failedToEnterCode) {
			this._log.debug('_updateFormAfterTwoFactorAuth failed to enter code', this);
			this._connectForm.get('code').setErrors({
				failedToEnterCode: true
			});
		}

		if (resp.unexpectedErrorOccured) {
			this._log.debug('_updateFormAfterTwoFactorAuth unexpected error occured', this);
			this._connectForm.get('code').setErrors({
				unexpectedErrorOccured: true
			});
		}
	}

	/**
	 * @description Updates form after email challenge pin operation.
	 * @param resp
	 */
	private _updateFormAfterEmailChallengePin(resp: EmailChallengePinResult): void {
		this._log.debug('_updateFormAfterEmailChallengePin', this, resp);
		if (resp.invalidOrExpiredPin && !resp.unexpectedErrorOccured) {
			this._log.debug('_updateFormAfterEmailChallengePin invalid or expired pin', this);
			this._connectForm.get('emailChallengePin').setErrors({
				invalidOrExpiredPin: true
			});
		}

		if (resp.failedToEnterPin) {
			this._log.debug('_updateFormAfterEmailChallengePin failed to enter pin', this);
			this._connectForm.get('emailChallengePin').setErrors({
				failedToEnterPin: true
			});
		}

		if (resp.twoFactorAuthRequired && !resp.unexpectedErrorOccured) {
			this._addCodeControl();
			this._connectForm.removeControl('emailChallengePin');
		}

		if (resp.unexpectedErrorOccured) {
			this._log.debug('_updateFormAfterEmailChallengePin unexpected error occured', this);
			this._connectForm.get('emailChallengePin').setErrors({
				unexpectedErrorOccured: true
			});
		}
	}

	/**
	 * @description Gets virtual assistant info and initializes the form.
	 * @returns virtual assistant info$
	 */
	private _getVirtualAssistantInfo$(): Observable<VirtualAssistantInfo> {
		return this._sb.virtualAssistantInfo$.pipe(
			tap((resp) => this._linkAccountDisabled(resp)),
			tap((resp) => this._virtualAssistantSetupForm.get('timezoneId').setValue(resp?.assistant?.timezoneId))
		);
	}

	/**
	 * @description Whether link account expansion panel should be disabled or not.
	 * @param virtualAssistantInfo
	 */
	private _linkAccountDisabled(virtualAssistantInfo: VirtualAssistantInfo): void {
		this._log.debug('_linkAccountDisabled', this, virtualAssistantInfo);
		this._isLinkAccountDisabled = virtualAssistantInfo;
	}

	/**
	 * @description Gets connected info.
	 * @returns connected info$
	 */
	private _getConnectedInfo$(): Observable<ConnectedInfo> {
		return this._sb.connectedInfo$.pipe(
			filter((resp) => !!resp),
			tap((resp) => {
				this._log.debug('_getConnectedInfo$', this, resp);
				this._connectedForm.get('username').setValue(resp?.connectedAccount?.email || '');
			})
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
		this._connectedForm = this._createConnectedForm();
		this._virtualAssistantSetupForm = this._createVirtualAssistantSetupForm();
	}

	/**
	 * @description Creates connected form.
	 * @returns connected form
	 */
	private _createConnectedForm(): FormGroup {
		return this._fb.group({
			username: this._fb.control('')
		});
	}

	/**
	 * @description Creates connect form.
	 * @returns connect form
	 */
	private _createConnectForm(): FormGroup {
		return this._fb.group({
			username: this._fb.control('', [LdslyValidators.required, LdslyValidators.email]),
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
