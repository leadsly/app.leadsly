/**
 * @description Leadsly setup result.
 */
export interface LeadslySetupResult {
	/**
	 * @description Whether this is a new user.
	 */
	newUser?: boolean;

	/**
	 * @description Whether this user requires new cloud resource.
	 */
	requiresNewCloudResource?: boolean;
}
