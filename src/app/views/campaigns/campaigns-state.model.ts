import { PrimaryProspectList } from 'app/core/models/campaigns/primary-prospect-list';
import { Campaign } from './../../core/models/campaigns/campaign.model';
export interface CampaignsStateModel {
	entities: {
		[id: string]: Campaign;
	};
	userProspectLists: PrimaryProspectList[];
}
