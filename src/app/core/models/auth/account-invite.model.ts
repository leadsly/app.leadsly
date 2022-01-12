/**
 * AccountInvite model.
 */
export interface AccountInvite {
	/**
	 * If an the given e-mail address was not invited to register with leadsly.
	 */
	error: boolean;

	/**
	 * Message about user trying to register.
	 */
	errorDescription: string;
}
