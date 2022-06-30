import { Connected } from '../models/connected.model';
import { LeadslyConnectResult } from '../models/profile/leadsly-connect-result.model';
import { VirtualAssistant } from '../models/profile/virtual-assistant.model';
import { TimeZone } from '../models/time-zone.model';

/**
 * @description Leadsly state model.
 */
export interface LeadslyStateModel {
	/**
	 * @description Whether this user is connected to virtual assistant.
	 */
	connected: Connected;

	/**
	 * @description Leadsly supported time zones.
	 */
	timeZones: TimeZone[];

	/**
	 * @description Leadsly setup result.
	 */
	virtualAssistant: VirtualAssistant;

	/**
	 * @description Leadsly connect result.
	 */
	connect: LeadslyConnectResult;
}
