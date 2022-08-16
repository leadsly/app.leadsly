/**
 * @description Email challenge pin result.
 */
export interface EmailChallengePinResult {
	/**
	 * @description Whether the pin is invalid or expired.
	 */
	invalidOrExpiredPin: boolean;

	/**
	 * @description Whether an unexpected error has occured.
	 */
	unexpectedErrorOccured: boolean;

	/**
	 * @description Whether hal failed to enter email challenge pin.
	 */
	failedToEnterPin: boolean;

	/**
	 * @description Whether two factor auth is required.
	 */
	twoFactorAuthRequired: boolean;
}
