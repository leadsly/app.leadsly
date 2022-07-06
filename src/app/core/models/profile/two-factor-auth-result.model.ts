/**
 * @description Two factor auth entered code result.
 */
export interface TwoFactorAuthResult {
	/**
	 * @description Whether the code is invalid or expired.
	 */
	invalidOrExpiredCode: boolean;

	/**
	 * @description Whether an unexpected error has occured.
	 */
	unexpectedErrorOccured: boolean;

	/**
	 * @description Whether hal failed to enter two factor auth code.
	 */
	failedToEnterCode: boolean;
}
