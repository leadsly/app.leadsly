import { PrimaryProspectList } from 'app/core/models/campaigns/primary-prospect-list';
import { Campaign } from './../../core/models/campaigns/campaign.model';
/**
 * @description Campaigns state model.
 */
export interface CampaignsStateModel {
	/**
	 * @description Campaign entities.
	 */
	entities: {
		[id: string]: Campaign;
	};

	/**
	 * @description Campaign's prospect list.
	 */
	userProspectLists: PrimaryProspectList[];
}
