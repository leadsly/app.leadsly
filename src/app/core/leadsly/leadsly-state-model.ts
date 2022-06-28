import { TimeZone } from '../models/time-zone.model';

/**
 * @description Leadsly state model.
 */
export interface LeadslyStateModel {
	/**
	 * @description Connected LinkedIn account.
	 */
	connectedAccount: string;

	/**
	 * @description Hal id.
	 */
	halId: string;

	/**
	 * @description Leadsly supported time zones.
	 */
	supportedTimeZones: TimeZone[];
}
