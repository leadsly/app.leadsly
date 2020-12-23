import { Injectable } from '@angular/core';
import { TwoFactorAuthenticationAsyncService } from 'app/core/services/two-factor-authentication-async.service';
import { tap } from 'rxjs/operators';
import * as TwoFactorAuthentication from './two-factor-authentication/two-factor-authentication.store.actions';
import { Store, Select } from '@ngxs/store';
import { TwoFactorAuthenticationState } from './two-factor-authentication/two-factor-authentication.store.state';
import { Observable } from 'rxjs';
import { AuthenticatorSetupModel } from 'app/core/models/2fa/authenticator-setup.model.2fa';
import { AuthenticatorVerificationCodeModel } from 'app/core/models/2fa/authenticator-verification-code-model.2fa';
import { AuthenticatorSetupResultModel } from 'app/core/models/2fa/authenticator-setup-result-model.2fa';
import { UsersAsyncService } from 'app/core/services/users-async.service';
import * as Dash from './dashboard/dashboard.store.actions';
import { UserProfileDetails } from 'app/core/models/user-profile-details.model';
import { DashboardState } from './dashboard/dashboard.store.state';
import { AuthState } from 'app/core/auth/auth.store.state';

/**
 * User dashboard facade service.
 */
@Injectable()
export class DashboardFacadeService {
	/**
	 * Select authenticator setup model.
	 */
	@Select(TwoFactorAuthenticationState.selectAuthenticatorSetup) authenticatorSetupModel$: Observable<AuthenticatorSetupModel>;

	@Select(DashboardState.selectHasTwoFactorEnabled) hasTwoFactorEnabled$: Observable<boolean>;

	/**
	 * Selects authenticator setup result model.
	 */
	@Select(TwoFactorAuthenticationState.selectAuthenticatorSetupResult) authenticatorSetupResultModel$: Observable<AuthenticatorSetupResultModel>;
	@Select(TwoFactorAuthenticationState.selectRecoveryCodes) recoveryCodes$: Observable<string[]>;

	@Select(DashboardState.selectUserProfileDetails) userProfileDetails$: Observable<UserProfileDetails>;

	@Select(DashboardState.selectHasAuthenticator) hasAuthenticator$: Observable<boolean>;

	/**
	 * Creates an instance of dashboard facade service.
	 * @param twoFactorAuthenticationAsync
	 */
	constructor(
		private twoFactorAuthenticationAsync: TwoFactorAuthenticationAsyncService,
		private store: Store,
		private userAsyncService: UsersAsyncService
	) {}

	getUserProfile(): void {
		const id = this.store.selectSnapshot(AuthState.selectCurrentUserId);
		this.userAsyncService
			.getUserProfile(id)
			.pipe(tap((profileDetails) => this.store.dispatch(new Dash.SetUserProfileDetails(profileDetails))))
			.subscribe();
	}

	/**
	 * Gets information for setting up authenticator for 2FA.
	 */
	setupAuthenticator(): void {
		this.twoFactorAuthenticationAsync
			.setupAuthenticator()
			.pipe(tap((authenticatorInfo) => this.store.dispatch(new TwoFactorAuthentication.AuthenticatorSetup(authenticatorInfo))))
			.subscribe();
	}

	/**
	 * Verifys authenticator verification code is valid.
	 * @param model
	 */
	verifyAuthenticator(model: AuthenticatorVerificationCodeModel): void {
		this.twoFactorAuthenticationAsync
			.verifyAuthenticator(model)
			.pipe(tap((authenticatorResult) => this.store.dispatch(new TwoFactorAuthentication.AuthenticatorVerificationResult(authenticatorResult))))
			.subscribe();
	}

	/**
	 * Generates recovery codes.
	 */
	generateRecoveryCodes(): void {
		this.twoFactorAuthenticationAsync
			.generate2FaRecoveryCodes()
			.pipe(tap((result) => new TwoFactorAuthentication.GenerateRecoveryCodes(result)))
			.subscribe();
	}

	/**
	 * Disables two factor authentication.
	 */
	disable2Fa(): void {
		this.twoFactorAuthenticationAsync
			.disable2Fa()
			.pipe(tap(() => new TwoFactorAuthentication.Disable2Fa()))
			.subscribe();
	}
}
