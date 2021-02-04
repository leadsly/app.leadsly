import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OdmValidators } from 'app/core/form-validators/odm-validators';
import { AuthFacadeService } from '../auth-facade.service';
import { Observable } from 'rxjs';

/**
 * Forgot password component.
 */
@Component({
	selector: 'odm-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {
	/**
	 * Forgot password form of forgot password component.
	 */
	_forgotPasswordForm: FormGroup;

	/**
	 * Creates an instance of forgot password component.
	 * @param fb
	 * @param facade
	 */
	constructor(private facade: AuthFacadeService) {}

	/**
	 * NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this.facade.log.trace('Initialized.', this);
		this._initForm();
	}

	/**
	 * Event handler for when the form is submitted.
	 */
	_onFormSubmitted(): void {
		this.facade.log.trace('_onFormSubmitted fired.', this);
		const value = this._forgotPasswordForm.value as { email: string };
		this.facade.onForgotPassword(value.email);
	}

	/**
	 * Event handler for when forgot-password form is cancelled.
	 */
	_onCancelClicked(): void {
		this.facade.log.trace('_onCancelClicked fired.', this);
		this.facade.onUpdateActiveAuthType({ activeAuthType: 'sign-in-active' });
		void this.facade.router.navigate(['auth']);
	}

	/**
	 * Gets translated error message.
	 * @param errors
	 * @returns translated error message$
	 */
	_getTranslatedErrorMessage$(): Observable<string> {
		const control = this._forgotPasswordForm.get('email');
		return this.facade.translateError.translateErrorMessage$(control.errors);
	}

	/**
	 * Initializes forms for forgot-password component.
	 */
	private _initForm(): void {
		this._forgotPasswordForm = this._initForgotPasswordForm();
	}

	/**
	 * Returns form group for forgot-password form.
	 * @returns forgot password form
	 */
	private _initForgotPasswordForm(): FormGroup {
		return this.facade.fb.group({
			email: this.facade.fb.control('', [OdmValidators.required, OdmValidators.email])
		});
	}
}
