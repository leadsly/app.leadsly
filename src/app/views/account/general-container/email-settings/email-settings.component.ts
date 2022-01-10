import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { downUpFadeInAnimation, ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/core.module';
import { LDSLY_GLOBAL_ACCOUNT_HEADER_SIZE, LDSLY_GLOBAL_ACCOUNT_SHORT_DESCRIPTION_SIZE } from 'app/shared/global-settings/global-settings';
import { BehaviorSubject } from 'rxjs';
import { AccountSandboxService } from '../../account-sandbox.service';

/**
 * Email settings component displayed in the general view.
 */
@Component({
	selector: 'ldsly-email-settings',
	templateUrl: './email-settings.component.html',
	styleUrls: ['./email-settings.component.scss'],
	animations: [downUpFadeInAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailSettingsComponent {
	/**
	 * Route animations.
	 */
	readonly _routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

	/**
	 * Short description font size.
	 */
	readonly _shortDescription = LDSLY_GLOBAL_ACCOUNT_SHORT_DESCRIPTION_SIZE;

	/**
	 * Account header font size.
	 */
	readonly _accountHeader = LDSLY_GLOBAL_ACCOUNT_HEADER_SIZE;

	/**
	 * User's email.
	 */
	@Input() email: string;

	/**
	 * Whether the general data is being fetched.
	 */
	@Input() set loading(value: boolean) {
		this._sb.log.debug('loading property set to:', this, value);
		this._loadingSub.next(value);
	}

	/**
	 * Loading subject required to manually emit property value when its being set.
	 */
	private readonly _loadingSub = new BehaviorSubject<boolean>(false);

	/**
	 * Whether the user's email is being fetched or not.
	 */
	_loading$ = this._loadingSub.asObservable();

	/**
	 * Whether 'Resend verification email' option is enabled/disabled.
	 */
	@Input() set disableResendVerification(value: boolean) {
		this._sb.log.debug('disableResendVerification property set.', this, value);
		this._disableResendVerificationSub.next(value);
	}

	/**
	 * Disable resend verification subject.
	 */
	private readonly _disableResendVerificationSub = new BehaviorSubject<boolean>(false);

	/**
	 * Whether user can click resend verification or if they are in current time out.
	 */
	_disableResendVerification$ = this._disableResendVerificationSub.asObservable();

	/**
	 * Whether user's email has been verified or not.
	 */
	@Input() verified: boolean;

	/**
	 * Event emitter when user requests to re-send email verification.
	 */
	@Output() resendEmailVerificationClicked = new EventEmitter<void>();

	/**
	 * Creates an instance of email settings component.
	 * @param _sb
	 * @param _route
	 */
	constructor(private _sb: AccountSandboxService, private _route: ActivatedRoute) {}

	/**
	 * Event handler when user clicks to launch the change password view.
	 */
	_onChangeEmailClicked(): void {
		this._sb.log.trace('_onChangePasswordClicked fired.', this);
		void this._sb.router.navigate(['general/change-email'], { relativeTo: this._route.parent });
	}

	/**
	 * Event handler that resends user's email verification link.
	 */
	_onResendEmailVerificationClicked(): void {
		this._sb.log.trace('_onResendEmailVerificationClicked fired.', this);
		this.resendEmailVerificationClicked.emit();
	}
}
