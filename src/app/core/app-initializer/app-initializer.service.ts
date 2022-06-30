import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import * as Auth from '../auth/auth.store.actions';
import { AuthState } from '../auth/auth.store.state';

import { LogService } from '../logger/log.service';

import { LinkedInAccountService } from '../services/linkedin-account.service';

/**
 * App initializer service.
 */
@Injectable({
	providedIn: 'root'
})
export class AppInitializerService {
	/**
	 * Creates an instance of app initializer service.
	 * @param _store
	 * @param _authService
	 * @param _log
	 */
	constructor(
		private _store: Store,
		private _router: Router,
		private _authService: AuthService,
		private _linkedInAccountService: LinkedInAccountService,
		private _log: LogService // private _leadslyService: LeadslyService
	) {}

	/**
	 * Initializes user's session.
	 * @returns user session
	 */
	initUserSession(): Promise<any> {
		this._log.trace('initUserSession executing.', this);
		const isAuthenticated = this._store.selectSnapshot(AuthState.selectIsAuthenticated);
		this._log.debug('[initUserSession] isAuthenticated:', this, isAuthenticated);
		const explicitlySignedOut = this._store.selectSnapshot(AuthState.selectDidUserExplicitlySignout);
		this._log.debug('[initUserSession] explicitlySignedOut:', this, explicitlySignedOut);
		const promise = this._authService
			.initUserSession$(isAuthenticated, explicitlySignedOut)
			.toPromise()
			.then((result) => {
				this._log.debug('[initUserSession] result:', this, result.succeeded);
				if (result.succeeded) {
					this._log.debug('[initUserSession] authenticating user.', this);
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					return this._authService
						.authenticate$(result.accessToken)
						.toPromise()
						.then(async () => {
							this._log.debug('[initUserSession] User is authenticated. Starting monitoring session activity.', this);
							void this._authService.monitorSessionActivity$().toPromise();
							this._log.debug('[initUserSession] monitorSessionActivity$ executed.', this);

							void lastValueFrom(this._linkedInAccountService.getConnectedAccount$());
						});
				}
				if (result.error) {
					this._log.debug('[initUserSession] Signing user out. Did user explicitly sign out:', this, explicitlySignedOut);
					return this._authService
						.appInitializerUserSignOut$(explicitlySignedOut)
						.toPromise()
						.then(() => {
							this._log.debug('[initUserSession] Navigating to auth/sign-in.', this);
							void this._router.navigate(['auth/sign-in']);
						})
						.catch(() => {
							this._log.error('[initUserSession] Server error occured signing user out. Signing them out of the app.', this);
							this._store.dispatch([new Auth.Signout()]);
							this._log.error('[initUserSession] Navigating to auth/sign-in.', this);
							void this._router.navigate(['auth/sign-in']);
						});
				}
			})
			.catch(() => {
				this._log.error(
					'[initUserSession$] Error occured initializing user`s session. Signing user out. Did user explicitly sign out:',
					this,
					explicitlySignedOut
				);
				return this._authService
					.appInitializerUserSignOut$(explicitlySignedOut)
					.toPromise()
					.then(() => {
						this._log.debug('[initUserSession$] Navigating to auth/sign-in.', this);
						void this._router.navigate(['auth/sign-in']);
					})
					.catch(() => {
						this._log.error('[initUserSession] Server error occured signing user out. Signing them out of the app.', this);
						this._store.dispatch([new Auth.Signout()]);
						this._log.error('[initUserSession] Navigating to auth/sign-in.', this);
						void this._router.navigate(['auth/sign-in']);
					});
			});

		return promise;
	}
}
