import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthBase } from 'app/views/auth/auth-base';
import { ODM_SMALL_SPINNER_DIAMETER, ODM_SMALL_SPINNER_STROKE_WIDTH } from 'app/shared/global-settings/mat-spinner-settings';
import { TranslateValidationErrorsService } from 'app/shared/services/translate-validation-errors.service';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { OdmValidators } from 'app/core/form-validators/odm-validators';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Verification code component. Takes verification code form and captures input. Handles displaying validation and server side errors.
 */
@Component({
	selector: 'odm-verification-code',
	templateUrl: './verification-code.component.html',
	styleUrls: ['./verification-code.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationCodeComponent extends AuthBase implements OnInit {
	/**
	 * Emitted when server responds with 40X error.
	 */
	@Input() set problemDetails(value: ProblemDetails) {
		this._log.debug('Problem Ddetails emitted.', this);
		this.problemDetailsError = value;
	}

	/**
	 * Emitted when server responds with 50X error.
	 */
	@Input() set internalServerErrorDetails(value: InternalServerErrorDetails) {
		this._log.debug('Internal server error emitted.', this);
		this.internalServerError = value;
	}

	/**
	 * Form responsible for containing code input field.
	 */
	@Input() set form(value: FormGroup) {
		if (value) {
			this._log.debug('Setting custom form.', this);
			this._form = this._validateForm(value);
		}
	}

	/**
	 * Form responsible for containing verification code input field.
	 */
	_form: FormGroup;

	/**
	 * Whether there is an outgoing request to verify two factor authentication setup verification code.
	 */
	@Input() codeVerificationInProgress: boolean;

	/**
	 * Whether the verification code was successfully verfied.
	 */
	@Input() codeVerificationSucceeded = false;

	/**
	 * Maximum allowed characters for the verification code input field.
	 */
	@Input() set verificationCodeInputLength(value: number) {
		if (value) {
			this._log.debug('verificationCodeInputLength specified. Setting max input field length to:', this, value);
			this._verificationCodeInputLength = value;
		}
	}

	/**
	 * Maximum allowed characters for the verification code input field.
	 */
	_verificationCodeInputLength = 6;

	/**
	 * Verification code label. Displayed in the Ui letting user know how many digits code has to have.
	 */
	_verificationCodeLabel$: Observable<string>;

	/**
	 * Event emitter when user submits verification code.
	 */
	@Output() verificationCodeSubmitted = new EventEmitter<unknown>();

	/**
	 * Event emitter when user cancels out of the setup wizard.
	 */
	@Output() cancelSetupWizardClicked = new EventEmitter<void>();

	/**
	 * Verified next step button spinner diameter.
	 */
	readonly _verifiedNextStepSpinnerDiameter = ODM_SMALL_SPINNER_DIAMETER;

	/**
	 * Verified next step button spinner stroke width.
	 */
	readonly _verifiedNextStepSpinnerStrokeWidth = ODM_SMALL_SPINNER_STROKE_WIDTH;

	/**
	 * Translation key of verification code component.
	 */
	private readonly _translationKey = 'odm.auth.form.placeholders.verification-code';

	/**
	 * Creates an instance of verification code component.
	 * @param translateErrorValidationService
	 * @param _log
	 * @param cd
	 */
	constructor(
		private _fb: FormBuilder,
		private _translateService: TranslateService,
		translateErrorValidationService: TranslateValidationErrorsService,
		private _log: LogService,
		cd: ChangeDetectorRef
	) {
		super(translateErrorValidationService, _log, cd);
	}

	/**
	 * ngOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('Initialized.', this);
		if (!this._form) {
			this._log.debug('Custom form has not been specified, using default', this);
			this._initForm();
		}

		// 'odm.auth.form.placeholders.verification-code' string contains '{number}' placeholder that has to be replaced at run time.
		this._verificationCodeLabel$ = this._translateService
			.get(this._translationKey)
			.pipe(map((str: string) => (str = str.replace('{number}', this._verificationCodeInputLength.toString()))));
	}

	/**
	 * Event handler when user submits two factor authentication setup verification code.
	 */
	_onVerificationCodeSubmitted(): void {
		this._log.trace('_onVerificationCodeSubmitted fired.', this);
		const code = this._form.value as unknown;
		this.verificationCodeSubmitted.emit(code);
	}

	/**
	 * Event handler when user clicks to cancel the setup wizard.
	 */
	_onCancelClicked(): void {
		this._log.trace('_onCancelClicked fired.', this);
		this.cancelSetupWizardClicked.emit();
	}

	/**
	 * Validates custom form contains 'code' control.
	 * @param form
	 * @returns form
	 */
	private _validateForm(form: FormGroup): FormGroup {
		// if custom form does not contain code field throw an error
		if (!form.get('code')) {
			this._log.fatal("Custom form has to contain contral with the name 'code'!");
			throw new Error();
		}
		return form;
	}

	/**
	 * Inits Recovery code form.
	 */
	private _initForm(): void {
		this._form = this._fb.group({
			code: this._fb.control('', {
				validators: [
					OdmValidators.required,
					OdmValidators.minLength(this.verificationCodeInputLength),
					OdmValidators.maxLength(this.verificationCodeInputLength)
				],
				updateOn: 'change'
			})
		});
	}
}