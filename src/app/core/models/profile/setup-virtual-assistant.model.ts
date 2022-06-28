/**
 * @description Setup virtual assistant.
 */
export interface SetupVirtualAssistant {
	/**
	 * @description User id.
	 */
	userId: string;

	/**
	 * @description User's linked in account email.
	 */
	username: string;

	/**
	 * @description Type of assistant this is account is for.
	 */
	socialAccountType: 'LinkedIn';

	/**
	 * @description Desired time zone to run the container in.
	 */
	timeZoneId: string;
}
