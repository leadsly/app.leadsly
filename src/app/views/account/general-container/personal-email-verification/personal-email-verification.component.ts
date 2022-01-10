import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { downUpFadeInAnimation, ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/core.module';
import { LogService } from 'app/core/logger/log.service';
import { LDSLY_FALLBACK_EMAIL_ADDRESS } from 'app/shared/global-settings/fallback-email-address';
import { LDSLY_GLOBAL_ACCOUNT_SHORT_DESCRIPTION_SIZE } from 'app/shared/global-settings/global-settings';

/**
 * User's personal email component.
 */
@Component({
	selector: 'ldsly-personal-email-verification',
	templateUrl: './personal-email-verification.component.html',
	styleUrls: ['./personal-email-verification.component.scss'],
	animations: [downUpFadeInAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalEmailVerificationComponent {
	/**
	 * Personal email registered with user's account.
	 */
	@Input() email = '';

	/**
	 * Whether user's email is verified.
	 */
	@Input() verified: boolean;

	/**
	 * Whether the general data is being fetched.
	 */
	@Input() loading: boolean;

	/**
	 * Whether 'Resend verification email' option is enabled/disabled.
	 */
	@Input() set disableResendVerification(value: boolean) {
		this._log.debug('disableResendVerification property set.', this, value);
		this._disabled = value;
	}

	_disabled: boolean;

	/**
	 * Event emitter when user requests to re-send email verification.
	 */
	@Output() resendEmailVerificationClicked = new EventEmitter<void>();

	/**
	 * Fallback email address if one cannot be fetched from the server.
	 */
	readonly _fallbackEmail = LDSLY_FALLBACK_EMAIL_ADDRESS;

	/**
	 * Route animations.
	 */
	readonly _routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

	/**
	 * Short description font size.
	 */
	readonly _shortDescription = LDSLY_GLOBAL_ACCOUNT_SHORT_DESCRIPTION_SIZE;

	/**
	 * Creates an instance of personal email component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * Event handler that resends user's email verification link.
	 */
	_onResendEmailVerificationClicked(): void {
		this._log.trace('_onResendEmailVerificationClicked fired.', this);
		this.resendEmailVerificationClicked.emit();
	}
}
