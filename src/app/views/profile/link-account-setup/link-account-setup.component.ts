import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { LinkAccount } from 'app/core/models/profile/link-account.model';

/**
 * @description Link account setup component.
 */
@Component({
	selector: 'ldsly-link-account-setup',
	templateUrl: './link-account-setup.component.html',
	styleUrls: ['./link-account-setup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkAccountSetupComponent {
	/**
	 * @description Sets the form group for link account form.
	 */
	@Input() set form(value: FormGroup) {
		if (value) {
			this._linkAccountForm = value;
		}
	}

	/**
	 * @description Link account form of setup account component.
	 */
	_linkAccountForm: FormGroup;

	/**
	 * @description Event emitter when user clicks to link their account
	 */
	@Output() linkAccountRequested = new EventEmitter<LinkAccount>();

	/**
	 * Creates an instance of link account setup component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Event emitter when user clicks on link account button.
	 */
	_onFormSubmitted(): void {
		this._log.trace('[onLinkAccountClicked] Link account button clicked');
		const linkAccountRequest = this._linkAccountForm.value as LinkAccount;
		this.linkAccountRequested.emit(linkAccountRequest);
	}

	/**
	 * @description Gets error messages for link account form.
	 * @returns error message
	 */
	_getErrorMessages(): string {
		if (this._linkAccountForm.get('email').hasError('required')) {
			return 'You must enter a value';
		} else if (this._linkAccountForm.get('email').hasError('email')) {
			return 'Not a valid email';
		}

		return this._linkAccountForm.get('password').hasError('required') ? 'Password field is required' : '';
	}
}
