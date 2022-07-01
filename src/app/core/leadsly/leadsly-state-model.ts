import { ConnectedInfo } from '../models/connected-info.model';
import { VirtualAssistantInfo } from '../models/profile/virtual-assistant-info.model';
import { TimeZone } from '../models/time-zone.model';

/**
 * @description Leadsly state model.
 */
export interface LeadslyStateModel {
	/**
	 * @description Whether this user is connected to virtual assistant.
	 */
	connectedInfo: ConnectedInfo;

	/**
	 * @description Leadsly supported time zones.
	 */
	timeZones: TimeZone[];

	/**
	 * @description Leadsly setup result.
	 */
	virtualAssistantInfo: VirtualAssistantInfo;
}
