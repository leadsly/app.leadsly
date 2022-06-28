/**
 * @description Link account details.
 */
export interface LinkAccount {
	/**
	 * @description User's id.
	 */
	userId: string;

	/**
	 * @description User's email address.
	 */
	username: string;

	/**
	 * @description Type of assistant this is account is for.
	 */
	socialAccountType: 'LinkedIn';

	/**
	 * @description User's password
	 */
	password: string;

	/**
	 * @description Browser purpose for this request.
	 */
	browserPurpose: 'Auth';
}
