import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { downUpFadeInAnimation } from 'app/core/core.module';
import { LogService } from 'app/core/logger/log.service';
import { LDSLY_GLOBAL_ACCOUNT_HEADER_SIZE, LDSLY_GLOBAL_ACCOUNT_SHORT_DESCRIPTION_SIZE } from 'app/shared/global-settings/global-settings';

/**
 * Password settings security container component.
 */
@Component({
	selector: 'ldsly-password-settings',
	templateUrl: './password-settings.component.html',
	styleUrls: ['./password-settings.component.scss'],
	animations: [downUpFadeInAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordSettingsComponent {
	/**
	 * Short description font size.
	 */
	readonly _shortDescription = LDSLY_GLOBAL_ACCOUNT_SHORT_DESCRIPTION_SIZE;

	/**
	 * Account header font size.
	 */
	readonly _accountHeader = LDSLY_GLOBAL_ACCOUNT_HEADER_SIZE;

	/**
	 * Creates an instance of password settings component.
	 * @param _sb
	 * @param _route
	 * @param _log
	 */
	constructor(private _log: LogService, private _router: Router, private _route: ActivatedRoute) {}

	/**
	 * Event handler when user clicks to launch the change password view.
	 */
	_onChangePasswordClicked(): void {
		this._log.trace('_onChangePasswordClicked fired.', this);
		void this._router.navigate(['security/change-password'], { relativeTo: this._route.parent });
	}
}
