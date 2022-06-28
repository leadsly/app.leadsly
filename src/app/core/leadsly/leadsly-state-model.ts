import { LeadslyConnectResult } from '../models/profile/leadsly-connect-result.model';
import { LeadslySetupResult } from '../models/profile/leadsly-setup-result.model';
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
	timeZones: TimeZone[];

	/**
	 * @description Leadsly setup result.
	 */
	setup: LeadslySetupResult;

	/**
	 * @description Leadsly connect result.
	 */
	connect: LeadslyConnectResult;
}
