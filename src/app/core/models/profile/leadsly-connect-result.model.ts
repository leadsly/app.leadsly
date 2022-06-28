import { Failure } from '../failure.model';

export interface LeadslyConnectResult {
	twoFactorAuthRequired?: boolean;
	twoFactorAuthType?: 'None' | 'NotDetermined' | 'SMS' | 'AuthenticatorApp';
	unexpectedErrorOccured?: boolean;
	failures?: Failure[];
}
