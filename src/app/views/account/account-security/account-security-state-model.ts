/**
 * Security state model for ngxs store.
 */
export interface AccountSecurityStateModel {
	/**
	 * Whether user has setup two factor authentication before.
	 */
	hasAuthenticator: boolean;

	/**
	 * If two factor authentication is enabled/disabled.
	 */
	twoFactorEnabled: boolean;

	/**
	 * Any external logins for this user.
	 */
	externalLogins: string[];

	/**
	 * Number of recovery codes left.
	 */
	recoveryCodesLeft: number;

	/**
	 *  Recovery codes for this user.
	 */
	recoveryCodes: string[];
}
