/* eslint-disable unused-imports/no-unused-vars */
import { ConnectedInfo } from '../models/connected-info.model';
import { ConnectLinkedInAccountResult } from '../models/profile/connect-linked-in-account-result.model';
import { EmailChallengePinResult } from '../models/profile/email-challenge-pin-result.model';
import { TwoFactorAuthResult } from '../models/profile/two-factor-auth-result.model';
import { VirtualAssistantInfo } from '../models/profile/virtual-assistant-info.model';
import { VirtualAssistant } from '../models/profile/virtual-assistant.model';
import { TimeZone } from '../models/time-zone.model';

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
 * @description Virtual assistant info.
 */
export class SetVirtualAssistantInfo {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Set Virtual Assistant Info';

	/**
	 * Creates an instance of virtual assistant info.
	 * @param payload
	 */
	constructor(public payload: { virtualAssistantInfo: VirtualAssistantInfo }) {}
}

/**
 * @description Set connect linked in account result.
 */
export class SetConnectLinkedInAccountResult {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Set Connect LinkedIn Account Result';

	/**
	 * Creates an instance of connect linked in account result.
	 * @param payload
	 */
	constructor(public payload: { connectLinkedInAccountResult: ConnectLinkedInAccountResult }) {}
}

/**
 * @description Set two factor auth result.
 */
export class SetTwoFactorAuthResult {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Set Two Factor Auth Result';

	/**
	 * Creates an instance of set two factor auth result.
	 * @param payload
	 */
	constructor(public payload: { twoFactorAuthResult: TwoFactorAuthResult }) {}
}

/**
 * @description Set email challenge pin result.
 */
export class SetEmailChallengePinResult {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Set Email Challenge Pin Result';

	/**
	 * Creates an instance of set email challenge pin result.
	 * @param payload
	 */
	constructor(public payload: { emailChallengePinResult: EmailChallengePinResult }) {}
}

/**
 * @description Create virtual assistant.
 */
export class CreateVirtualAssistant {
	/**
	 * @description Type  of action.
	 */
	static readonly type = '[Leadsly] Create Virtual Assistant';

	/**
	 * Creates an instance of create virtual assistant.
	 * @param payload
	 */
	constructor(public payload: { assistant: VirtualAssistant }) {}
}

/**
 * @description Set connect value which represents if user is connected to virtual assistant.
 * and if they are what account they have linked.
 */
export class SetConnectedInfo {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Set Connected Info';

	/**
	 * Creates an instance of set connected.
	 * @param payload
	 */
	constructor(public payload: { connectedInfo: ConnectedInfo }) {}
}

/**
 * @description Delete virtual assistant.
 */
export class DeleteVirtualAssistant {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Leadsly] Delete Virtual Assistant';
}
