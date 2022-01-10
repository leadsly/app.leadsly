import { LdslyWebApiException } from './ldsly-web-api-exception.model';

/**
 * Internal server error details model.
 */
export interface InternalServerErrorDetails extends LdslyWebApiException {
	/**
	 * Http status code.
	 */
	status: number;

	/**
	 * Http error message.
	 */
	message: string;
}
