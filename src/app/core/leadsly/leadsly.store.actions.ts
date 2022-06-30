import { ConnectedAccount } from '../models/connected-account';
import { Connected } from '../models/connected.model';

import { VirtualAssistant } from '../models/profile/virtual-assistant.model';
import { TimeZone } from '../models/time-zone.model';
import { LeadslyConnectResult } from './../models/profile/leadsly-connect-result.model';

/**
 * @description Add connected account.
 */
export class AddConnectedAccount {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Add Connected Account';

	/**
	 * Creates an instance of add connected account.
	 * @param payload
	 */
	constructor(public payload: { connectedAccount: ConnectedAccount }) {}
}

/**
 * @description Set supported time zones.
 */
export class SetSupportedTimeZones {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Set Supported Time Zones';

	/**
	 * Creates an instance of set supported time zones.
	 * @param payload
	 */
	constructor(public payload: { timeZones: TimeZone[] }) {}
}

/**
 * @description Virtual assistant setup result.
 */
export class SetVirtualAssistant {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Set Virtual Assistant';

	/**
	 * Creates an instance of virtual assistant setup result.
	 * @param payload
	 */
	constructor(public payload: { virtualAssistant: VirtualAssistant }) {}
}

/**
 * @description Set connect result.
 */
export class SetConnected {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Set Connected Status';

	/**
	 * Creates an instance of set connected.
	 * @param payload
	 */
	constructor(public payload: { connected: Connected }) {}
}

/**
 * @description Connect account setup result.
 */
export class ConnectAccountSetupResult {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Connect Account Setup Result';

	/**
	 * Creates an instance of connect account setup result.
	 * @param payload
	 */
	constructor(public payload: { connect: LeadslyConnectResult }) {}
}
