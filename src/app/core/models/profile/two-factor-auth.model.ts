/**
 * @description Two factor auth code.
 */
export interface TwoFactorAuth {
	/**
	 * @description two factor auth code.
	 */
	code: string;

	/**
	 * @description User's LinkedIn email address.
	 */
	username?: string;
}
