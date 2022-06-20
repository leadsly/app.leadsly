import { OperationResult } from './operation-result.model';

/**
 * @description Operation response.
 */
export interface OperationResponse {
	operationResults: OperationResult;
	/**
	 * @description Old way of saving data coming from the server.
	 */
	value: any;

	/**
	 * @description New way of saving data coming from the server.
	 */
	data: any;
}
