import { VirtualAssistant } from './virtual-assistant.model';

/**
 * @description Virtual assistant info.
 */
export interface VirtualAssistantInfo {
	/**
	 * @description Whether virtual assistant has been created for this user.
	 */
	created: boolean;

	/**
	 * @description  Virtual assistant details.
	 */
	assistant?: VirtualAssistant;
}
