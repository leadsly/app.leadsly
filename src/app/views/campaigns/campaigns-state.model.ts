import { Campaign } from './../../core/models/campaigns/campaign.model';
export interface CampaignsStateModel {
	entities: {
		[id: string]: Campaign;
	};
}
