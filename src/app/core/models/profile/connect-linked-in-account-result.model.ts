/**
 * @description Connect linked in account to virtual assistant result.
 */
export interface ConnectLinkedInAccountResult {
	/**
	 * @description Whether user has entered invalid LinkedIn email.
	 */
	invalidEmail: boolean;

	/**
	 * @description Whether user has entered invalid LinkedIn password.
	 */
	invalidPassword: boolean;

	/**
	 * @description Whether two factor auth is required.
	 */
	twoFactorAuthRequired: boolean;
	/**
	 * @description Type of two fator auth required.
	 */
	TwoFactorAuthType: string;
	/**
	 * @description Whether an unexpected error has occured.
	 */
	unexpectedErrorOccured: boolean;
}
