import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { ConnectedInfo } from '../models/connected-info.model';
import { TwoFactorAuthResult } from '../models/profile/two-factor-auth-result.model';
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

	/**
	 * @description Connect linked in account result.
	 */
	connectLinkedInAccountResult?: ConnectLinkedInAccountResult;

	/**
	 * @description Enter two factor auth result.
	 */
	twoFactorAuthResult?: TwoFactorAuthResult;
}
