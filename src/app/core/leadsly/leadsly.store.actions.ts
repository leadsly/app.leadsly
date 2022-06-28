import { ConnectedAccount } from '../models/connected-account';
import { TimeZone } from '../models/time-zone.model';

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

/**
 * @description Set supported time zones.
 */
export class SetSupportedTimeZones {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[ConnectedAccount] Set Supported Time Zones';

	/**
	 * Creates an instance of set supported time zones.
	 * @param payload
	 */
	constructor(public payload: { timeZones: TimeZone[] }) {}
}
