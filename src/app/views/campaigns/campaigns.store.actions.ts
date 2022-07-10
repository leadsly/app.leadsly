import { Campaign } from 'app/core/models/campaigns/campaign.model';
import { Campaigns } from 'app/core/models/campaigns/campaigns.model';
import { DeleteCampaign } from 'app/core/models/campaigns/delete-campaign.model';
import { PrimaryProspectList } from 'app/core/models/campaigns/primary-prospect-list';
import { ToggleCampaignStatus } from 'app/core/models/campaigns/toggle-campaign-status.model';

/**
 * Sets user's active campaigns.
 */
export class SetUserCampaigns {
	/**
	 * Type of action.
	 */
	static readonly type = '[Campaigns] Sets User`s Campaigns';

	/**
	 * Creates an instance of set user campaigns.
	 * @param payload
	 */
	constructor(public payload: Campaigns) {}
}

/**
 * Creates new campaign.
 */
export class Create {
	/**
	 * Type of action.
	 */
	static readonly type = '[Campaigns] Creates New Campaign';

	/**
	 * Creates an instance of create campaign.
	 * @param payload
	 */
	constructor(public payload: Campaign) {}
}

/**
 * Toggle's campaign status.
 */
export class ToggleStatus {
	/**
	 * Type of action.
	 */
	static readonly type = '[Campaigns] Toggles Campaign Status';

	/**
	 * Creates an instance of deactivate campaign.
	 * @param payload
	 */
	constructor(public payload: ToggleCampaignStatus) {}
}

/**
 * Update campaign.
 */
export class Update {
	/**
	 * Type of action.
	 */
	static readonly type = '[Campaigns] Update Campaign';

	/**
	 * Creates an instance of update campaign.
	 * @param payload
	 */
	constructor(public payload: Campaign) {}
}

/**
 * Update cloned campaign id.
 */
export class UpdateClonedCampaignId {
	/**
	 * Type of action.
	 */
	static readonly type = '[Campaigns] Update Cloned Campaign Id';

	/**
	 * Creates an instance of update campaign.
	 * @param payload
	 */
	constructor(public payload: { clonedCampaign: Campaign; tempId: string }) {}
}

/**
 * Get campaign by id.
 */
export class SetCampaignById {
	/**
	 * Type of action.
	 */
	static readonly type = '[Campaigns] Set Campaign';

	/**
	 * Creates an instance of delete campaign.
	 * @param payload
	 */
	constructor(public payload: Campaign) {}
}

/**
 * Delete campaign.
 */
export class Delete {
	/**
	 * Type of action.
	 */
	static readonly type = '[Campaigns] Delete Campaign';

	/**
	 * Creates an instance of delete campaign.
	 * @param payload
	 */
	constructor(public payload: DeleteCampaign) {}
}

/**
 * @description Get user prospect lists.
 */
export class SetUserProspectLists {
	/**
	 * @description Type of action.
	 */
	static readonly type = '[Campaign] Set User Prospect Lists';

	/**
	 * Creates an instance of GetUserProspectLists action.
	 */
	constructor(public payload: PrimaryProspectList[]) {}
}
