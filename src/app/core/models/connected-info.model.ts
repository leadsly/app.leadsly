import { ConnectedAccount } from './connected-account';

/**
 * @description If this user is connected to virtual assistant.
 */
export interface ConnectedInfo {
	/**
	 * @description Whether this user is connected to virtual assistant.
	 */
	isConnected: boolean;

	/**
	 * @description User's connected account information.
	 */
	connectedAccount: ConnectedAccount;
}
