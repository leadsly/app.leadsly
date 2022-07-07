import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { LinkAccount } from 'app/core/models/profile/link-account.model';
import { TwoFactorAuthResult } from 'app/core/models/profile/two-factor-auth-result.model';
import { TwoFactorAuth } from 'app/core/models/profile/two-factor-auth.model';
import { LDSLY_SMALL_SPINNER_DIAMETER, LDSLY_SMALL_SPINNER_STROKE_WIDTH } from 'app/shared/global-settings/mat-spinner-settings';

/**
 * @description Link account component.
 */
@Component({
	selector: 'ldsly-link-account',
	templateUrl: './link-account.component.html',
	styleUrls: ['./link-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkAccountComponent implements OnInit, OnDestroy {
	/**
	 * @description Sets in progress flag to false on error.
	 */
	@Input() set serverErrorOccured(value: ProblemDetails | InternalServerErrorDetails) {
		this._log.debug('serverErrorOccured setter executed', this, value);
		this._inProgress = false;
	}

	/**
	 * @description Sets link account form.
	 */
	@Input() set form(value: FormGroup) {
		this._log.debug('form setter executed', this, value);
		this._form = value;
	}

	_form: FormGroup;

	/**
	 * @description Two factor auth result
	 */
	@Input() set twoFactorAuthResult(value: TwoFactorAuthResult) {
		this._log.debug('twoFacotAuthResult setter executed', this, value);
		this._twoFactorAuthResult = value;
		if (value) {
			this._inProgress = false;
		}
	}

	_twoFactorAuthResult: TwoFactorAuthResult;

	/**
	 * @description Sets connect linked in account result.
	 */
	@Input() set connectLinkedInAccountResult(value: ConnectLinkedInAccountResult) {
		this._log.debug('connectLinkedInAccountResult setter executed', this, value);
		this._connectLinkedInAccountResult = value;
		if (value) {
			this._inProgress = false;
		}
	}

	_connectLinkedInAccountResult: ConnectLinkedInAccountResult;

	/**
	 * @description Gets whether is two factor auth required.
	 */
	get _isTwoFactorAuthRequired(): boolean {
		return (
			this._connectLinkedInAccountResult &&
			this._connectLinkedInAccountResult?.twoFactorAuthRequired &&
			!this._connectLinkedInAccountResult?.unexpectedErrorOccured
		);
	}

	/**
	 * @description Event emitter when user clicks to link their account to virtual assistant.
	 */
	@Output() connect = new EventEmitter<LinkAccount>();

	/**
	 * @description Event emitter when user enters in their two factor auth code.
	 */
	@Output() twoFactorCodeEntered = new EventEmitter<TwoFactorAuth>();

	/**
	 * Button spinner diameter.
	 */
	readonly _spinnerDiameter = LDSLY_SMALL_SPINNER_DIAMETER;

	/**
	 * Button spinner stroke width.
	 */
	readonly _spinnerStrokeWidth = LDSLY_SMALL_SPINNER_STROKE_WIDTH;

	/**
	 * @description Determines whether request to link account to virtual assistant is in progress.
	 */
	_inProgress = false;

	/**
	 * Creates an instance of link account component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description NgOnInit lifecycle hook.
	 */
	ngOnInit(): void {
		this._log.trace('Initialized', this);
	}

	/**
	 * @description NgOnDestroy life cycle.
	 */
	ngOnDestroy(): void {
		this._log.debug('Destroyed', this);
		this._form.reset();
	}

	/**
	 * @description Event handler when user clicks to link their account to virtual assistant.
	 */
	_onSubmit(): void {
		this._log.debug('Connected account form', this, this._form.value);
		this._inProgress = true;
		this.connect.emit(this._form.value);
	}

	/**
	 * @description Event handler when user enters two factor auth code.
	 */
	_onSubmitTwoAuthCode(): void {
		this._log.debug('_onSubmitTwoAuthCode', this, this._form.value);
		this._inProgress = true;
		const code: TwoFactorAuth = {
			code: this._form.get('code').value as string,
			username: this._form.get('username').value as string
		};
		this.twoFactorCodeEntered.emit(code);
	}

	/**
	 * @description Gets error messages
	 * @returns error messages
	 */
	_getErrorMessages(): string {
		const mustHaveValue = 'You must enter a value';
		if (this._form.get('password').dirty && this._form.get('password').hasError('required')) {
			return mustHaveValue;
		}
		if (this._form.get('username').dirty && this._form.get('username').hasError('required')) {
			return mustHaveValue;
		}

		if (this._form.get('username').hasError('invalidLinkedInEmail')) {
			return 'Invalid LinkedIn email';
		}

		if (this._form.get('password').hasError('invalidLinkedInPassword')) {
			return 'Invalid LinkedIn password';
		}

		return this._form.get('username').dirty && this._form.get('username').hasError('email') ? 'Not a valid email' : '';
	}

	/**
	 * @description Gets two factor auth error messages.
	 * @returns two factor auth error messages
	 */
	_getTwoFactorAuthErrorMessages(): string {
		if (this._form.get('code').dirty && this._form.get('code').hasError('required')) {
			return 'You must enter a value';
		}
		if (this._form.get('code').hasError('invalidOrExpiredCode')) {
			return 'Invalid or expired code';
		}
	}
}
