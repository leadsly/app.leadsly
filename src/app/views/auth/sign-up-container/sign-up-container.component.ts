import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionCompletion } from '@ngxs/store';
import { rightLeftFadeInAnimation } from 'app/core/core.module';
import { LdslyValidators, MinPasswordLength } from 'app/core/form-validators/ldsly-validators';
import { ActiveAuthType } from 'app/core/models/auth/active-auth-type.model';
import { AuthTypeRouteUrl } from 'app/core/models/auth/auth-type-route-url.model';
import { PasswordHelpToggleClass } from 'app/core/models/auth/password-help-toggle-class.model';
import { PasswordRequirement } from 'app/core/models/auth/password-requirement.model';
import { SignupUser } from 'app/core/models/auth/signup-user.model';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { getPasswordRequirements } from 'app/core/utilities/password-requirements.utility';
import { MinScreenSizeQuery } from 'app/shared/screen-size-queries';
import { merge, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthSandboxService } from '../auth-sandbox.service';

/**
 * Sign up container component.
 */
@Component({
	selector: 'ldsly-sign-up-container',
	templateUrl: './sign-up-container.component.html',
	styleUrls: ['./sign-up-container.component.scss'],
	animations: [rightLeftFadeInAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpContainerComponent implements OnInit, OnDestroy {
	/**
	 * Emitted when server responds with 40X error.
	 */
	_problemDetails$: Observable<ProblemDetails>;

	/**
	 * Emitted when server responds with 50X error.
	 */
	_internalServerErrorDetails$: Observable<InternalServerErrorDetails>;

	/**
	 * Signup form of auth component.
	 */
	_signupForm: FormGroup;

	/**
	 * Whether user registration completed without errors.
	 */
	_registrationCompleted$: Observable<boolean>;

	/**
	 * Whether specified screen width was matched.
	 */
	_breakpointStateScreenMatcher$: Observable<BreakpointState>;

	/**
	 * Whether to display sign-in or sign-up component.
	 */
	_activeAuthType$: Observable<ActiveAuthType>;

	/**
	 * Requires user to enter the same password for confirm password field.
	 */
	_confirmPasswordMatchReqMet = false;

	/**
	 * Password requirements required for new user.
	 */
	_passwordRequirements: PasswordRequirement[] = [];

	/**
	 * Password help toggle class.
	 */
	_passwordHelpToggleClass: PasswordHelpToggleClass = 'auth__password-field-help-off';

	/**
	 * Whether Auth.Signin action has been dispatched and completed.
	 */
	signinActionCompleted$: Observable<ActionCompletion<any, Error>>;

	/**
	 * Rxjs subscriptions for this component.
	 */
	private readonly _subscription = new Subscription();

	/**
	 * Creates an instance of sign up container component.
	 * @param _sb
	 * @param _asyncValidators
	 * @param breakpointObserver
	 */
	constructor(breakpointObserver: BreakpointObserver, private _sb: AuthSandboxService, private _route: ActivatedRoute, private _fb: FormBuilder) {
		this._problemDetails$ = _sb.problemDetails$;
		this._internalServerErrorDetails$ = _sb.internalServerErrorDetails$;
		this._breakpointStateScreenMatcher$ = breakpointObserver.observe([MinScreenSizeQuery.md]);
		this._activeAuthType$ = _sb.activeAuthType$;
		this._registrationCompleted$ = _sb.registrationCompleted$;
		this.signinActionCompleted$ = _sb.signInActionCompleted$;
	}

	/**
	 * NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._sb.log.trace('Initialized.', this);
		this._initForms();
		// initialize password requirements.
		this._passwordRequirements = this._initPasswordRequirements();
		// subscribe to confirm password control to check if passwords match.
		this._subscription.add(this._validateFormConfirmPasswordField$().subscribe());

		this._subscription.add(this._listenIfUserSignedIn$().subscribe());

		// subscribe to server errors.
		this._subscription.add(this._listenForServerErrors$().subscribe());
	}

	/**
	 * NgOnDestroy life cycle.
	 */
	ngOnDestroy(): void {
		this._sb.log.trace('Destroyed.', this);
		this._subscription.unsubscribe();
	}

	/**
	 * Event handler for when user signs up.
	 * @param model
	 */
	_onSignupSubmitted(model: SignupUser): void {
		this._sb.log.trace('_onSignupSubmitted event handler fired.', this);
		const registrationToken = this._route.snapshot.queryParams['registrationToken'] as string;
		this._sb.signupUser(model, registrationToken);
	}

	/**
	 * Used to switch view to signin context.
	 */
	_onSwitchToSigninClicked(event: ActiveAuthType): void {
		this._sb.log.trace('_switchToSignup fired.', this);
		const activeAuthType = { activeAuthType: event };
		const routeUrl: AuthTypeRouteUrl = event === 'sign-in-active' ? 'sign-in' : 'sign-up';
		this._sb.updateActiveAuthType(activeAuthType);
		setTimeout(() => {
			void this._sb.router.navigate([routeUrl], { relativeTo: this._route.parent, queryParamsHandling: 'merge' });
		}, 300);
	}

	/**
	 * Event handler when user toggles password help.
	 */
	_onPasswordHelpToggled(): void {
		this._sb.log.trace('_onPasswordHelpToggled fired.', this);
		if (this._passwordHelpToggleClass === 'auth__password-field-help-off') {
			this._passwordHelpToggleClass = 'auth__password-field-help-on';
		} else {
			this._passwordHelpToggleClass = 'auth__password-field-help-off';
		}
	}

	/**
	 * Listens to server errors and sets problem details and internal server error details.
	 * @returns emits ProblemDetails | InternalServerErrorDetails observable
	 */
	private _listenForServerErrors$(): Observable<ProblemDetails | InternalServerErrorDetails> {
		this._sb.log.trace('_listenForServerErrors$ fired.', this);
		return merge(this._problemDetails$, this._internalServerErrorDetails$).pipe(
			tap(() => this._userRegistrationSuccess({ registrationCompleted: false }))
		);
	}

	/**
	 * Listens if user has signed in.
	 * @returns if user signed in
	 */
	private _listenIfUserSignedIn$(): Observable<ActionCompletion<any, Error>> {
		return this.signinActionCompleted$.pipe(tap(() => void this._sb.router.navigate(['account'])));
	}

	/**
	 * Whether user registration completed without errors.
	 * @param value
	 */
	private _userRegistrationSuccess(value: { registrationCompleted: boolean }): void {
		this._sb.userRegistrationCompleted(value);
	}

	/**
	 * Validates form confirm password field.
	 * @param form
	 * @returns form confirm password field
	 */
	private _validateFormConfirmPasswordField$(): Observable<any> {
		return this._signupForm.valueChanges.pipe(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			tap((_) => {
				if (this._signupForm.hasError('notSame')) {
					this._confirmPasswordMatchReqMet = false;
				} else {
					this._confirmPasswordMatchReqMet = true;
				}
			})
		);
	}

	/**
	 * Inits singin and signup forms.
	 */
	private _initForms(): void {
		this._signupForm = this._initSignupForm();
	}

	/**
	 * Inits new user's password requirements.
	 */
	private _initPasswordRequirements(): PasswordRequirement[] {
		return getPasswordRequirements();
	}

	/**
	 * Creates FormGroup for signup form.
	 * @returns signup form
	 */
	private _initSignupForm(): FormGroup {
		return this._fb.group(
			{
				email: this._fb.control('', {
					validators: [LdslyValidators.required, LdslyValidators.email],
					asyncValidators: [this._sb.asyncValidators.isEmailInvitedToRegister()],
					updateOn: 'blur'
				}),
				password: this._fb.control('', {
					validators: [
						LdslyValidators.required,
						LdslyValidators.minLength(MinPasswordLength),
						LdslyValidators.requireDigit,
						LdslyValidators.requireLowercase,
						LdslyValidators.requireUppercase,
						LdslyValidators.requireNonAlphanumeric,
						LdslyValidators.requireThreeUniqueCharacters
					],
					updateOn: 'change'
				}),
				confirmPassword: this._fb.control('', LdslyValidators.required)
			},
			{
				validators: LdslyValidators.requireConfirmPassword,
				updateOn: 'change'
			}
		);
	}
}
