import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { ConnectedInfo } from 'app/core/models/connected-info.model';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { EmailChallengePinResult } from 'app/core/models/profile/email-challenge-pin-result.model';
import { EmailChallengePin } from 'app/core/models/profile/email-challenge-pin.model';
import { LinkAccount } from 'app/core/models/profile/link-account.model';
import { TwoFactorAuthResult } from 'app/core/models/profile/two-factor-auth-result.model';
import { VirtualAssistantInfo } from 'app/core/models/profile/virtual-assistant-info.model';
import { TwoFactorAuth } from './../../../core/models/profile/two-factor-auth.model';

/**
 * @description Linked account overview component.
 */
@Component({
	selector: 'ldsly-linked-account-overview',
	templateUrl: './linked-account-overview.component.html',
	styleUrls: ['./linked-account-overview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkedAccountOverviewComponent {
	/**
	 * @description Sets in progress flag to false on error.
	 */
	@Input() set serverErrorOccured(value: ProblemDetails | InternalServerErrorDetails) {
		this._log.debug('serverErrorOccured setter executed', this, value);
		this._serverErrorOccured = value;
	}

	/**
	 * @description Server error occured.
	 */
	_serverErrorOccured: ProblemDetails | InternalServerErrorDetails;

	/**
	 * @description Whether this expansion panel is disabled.
	 */
	@Input() set disabled(value: VirtualAssistantInfo) {
		this._log.debug('disabled setter executed', this, value);
		this._disabled = Object.keys(value?.assistant || {}).length === 0;
	}

	_disabled = true;

	/**
	 * @description Sets account value.
	 */
	@Input() set connectedInfo(value: ConnectedInfo) {
		this._log.debug('connectedInfo setter executed', this, value);
		this._connectedInfo = value;
	}

	_connectedInfo: ConnectedInfo;

	/**
	 * @description Sets link account form.
	 */
	@Input() set connectedForm(value: FormGroup) {
		this._log.debug('form setter executed', this, value);
		this._connectedForm = value;
	}

	_connectedForm: FormGroup;

	/**
	 * @description Sets link account form.
	 */
	@Input() set connectForm(value: FormGroup) {
		this._log.debug('form setter executed', this, value);
		this._connectForm = value;
	}

	_connectForm: FormGroup;

	/**
	 * @description Sets connect linked in account result.
	 */
	@Input() set connectLinkedInAccountResult(value: ConnectLinkedInAccountResult) {
		this._log.debug('connectLinkedInAccountResult setter executed', this, value);
		this._connectLinkedInAccountResult = value;
	}

	_connectLinkedInAccountResult: ConnectLinkedInAccountResult;

	/**
	 * @description Two factor auth result.
	 */
	@Input() set twoFactorAuthResult(value: TwoFactorAuthResult) {
		this._log.debug('twoFactorAuthResult setter executed', this, value);
		this._twoFactorAuthResult = value;
	}

	_twoFactorAuthResult: TwoFactorAuthResult;

	/**
	 * @description Email challenge pin result.
	 */
	@Input() set emailChallengePinResult(value: EmailChallengePinResult) {
		this._log.debug('emailChallengePinResult setter executed', this, value);
		this._emailChallengePinResult = value;
	}

	_emailChallengePinResult: EmailChallengePinResult;

	/**
	 * @description Event emitter when user clicks to link their account to virtual assistant.
	 */
	@Output() connect = new EventEmitter<LinkAccount>();

	/**
	 * @description Event emitter when user clicks to disconnect their account from virtual assistant.
	 */
	@Output() disconnect = new EventEmitter<void>();

	/**
	 * @description Event emitter when user enters in their two factor auth code.
	 */
	@Output() twoFactorCodeEntered = new EventEmitter<TwoFactorAuth>();

	/**
	 * @description Event emitter when user enters in their email challenge pin.
	 */
	@Output() emailChallengePinEntered = new EventEmitter<EmailChallengePin>();

	/**
	 * Creates an instance of linked account overview component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Event handler when user requests to link his linked in account to virtual assistant.
	 * @param event
	 */
	_onConnectToVirtualAssistant(event: LinkAccount): void {
		this._log.debug('_onConnectToVirtualAssistant event handler fired.', this, event);
		this.connect.emit(event);
	}

	/**
	 * @description Event handler when user requests to disconnect his linked in account from virtual assistant.
	 */
	_onDisconnectRequested(): void {
		this._log.debug('_onDisconnectRequested event handler fired.', this);
		this.disconnect.emit();
	}

	/**
	 * @description Event handler when user enters in their two factor auth code
	 * @param event
	 */
	_onTwoFactorAuthCodeEntered(event: TwoFactorAuth): void {
		this._log.debug('_onTwoFactorAuthCodeEntered event handler fired.', this, event);
		this.twoFactorCodeEntered.emit(event);
	}

	/**
	 * @description Event handler when user enters in their email challenge pin.
	 * @param event
	 */
	_onEmailChallengePinEntered(event: EmailChallengePin): void {
		this._log.debug('_onEmailChallengePinEntered event handler fired.', this, event);
		this.emailChallengePinEntered.emit(event);
	}
}
