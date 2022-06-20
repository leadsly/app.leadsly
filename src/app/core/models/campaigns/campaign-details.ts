import { PrimaryProspectList } from './primary-prospect-list';
export interface CampaignDetails {
	name: string;
	dailyInviteLimit: number;
	warmUp?: boolean;
	startTimestamp?: number;
	endTimestamp?: number;
	campaignType: string;
	primaryProspectList: PrimaryProspectList;
}
