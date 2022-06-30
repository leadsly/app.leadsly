/**
 * @description Setup virtual assistant.
 */
export interface SetupVirtualAssistant {
	/**
	 * @description User id.
	 */
	userId: string;

	/**
	 * @description Desired time zone to run the container in.
	 */
	timeZoneId: string;
}
