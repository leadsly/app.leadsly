import { ConnectedAccount } from '../models/connected-account';

/**
 * @description Add connected account.
 */
export class AddConnectedAccount {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[ConnectedAccount] Add Connected Account';

	/**
	 * Creates an instance of add connected account.
	 * @param payload
	 */
	constructor(public payload: { leadslyDetails: ConnectedAccount }) {}
}
