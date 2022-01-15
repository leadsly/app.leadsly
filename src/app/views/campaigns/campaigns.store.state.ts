import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { LogService } from 'app/core/logger/log.service';
import { updateEntity } from 'app/shared/state-helpers';
import produce from 'immer';
import { normalize } from 'normalizr';
import { Campaign } from './../../core/models/campaigns/campaign.model';
import { campaignsSchema } from './campaigns-normalizr.schema';
import { CampaignsStateModel } from './campaigns-state.model';
import * as Campaigns from './campaigns.store.actions';

const CAMPAIGNS_STATE_TOKEN = new StateToken<CampaignsStateModel>('campaigns');

/**
 * @description Campaign state.
 */
@State<CampaignsStateModel>({
	name: CAMPAIGNS_STATE_TOKEN,
	defaults: {
		entities: {}
	}
})
@Injectable()
export class CampaignsState {
	/**
	 * @description Selects campaign list.
	 * @param state
	 * @returns campaigns
	 */
	@Selector()
	static getCampaigns(state: CampaignsStateModel): Campaign[] {
		return Object.values(state.entities);
	}

	/**
	 * Creates an instance of campaigns state.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Initializes campaigns
	 * @param ctx
	 * @param action
	 */
	@Action(Campaigns.SetUserCampaigns)
	initializeCampaigns(ctx: StateContext<CampaignsStateModel>, action: Campaigns.SetUserCampaigns): void {
		this._log.info('Initializing campaigns state.', this);
		const normalizedData = normalize(action.payload.items, {
			campaigns: [campaignsSchema]
		});
		const campaigns = normalizedData.entities['campaigns'];
		ctx.setState(
			produce((draft: CampaignsStateModel) => {
				draft.entities = campaigns;
				return draft;
			})
		);
	}

	/**
	 * @description Create a campaign
	 * @param ctx
	 * @param action
	 */
	@Action(Campaigns.Create)
	create(ctx: StateContext<CampaignsStateModel>, action: Campaigns.Update): void {
		this._log.info('[CampaignsStore] Creating a new campaign.', this);
		ctx.setState(
			produce((draft: CampaignsStateModel) => {
				draft.entities[action.payload.id] = action.payload;
			})
		);
	}

	/**
	 * @description Deletes a campaign
	 * @param ctx
	 * @param action
	 */
	@Action(Campaigns.Delete)
	delete(ctx: StateContext<CampaignsStateModel>, action: Campaigns.Delete): void {
		this._log.info(`[CampaignsStore] Deleting campaign with id: ${action.payload.id}.`, this);
		ctx.setState(
			produce((draft: CampaignsStateModel) => {
				delete draft.entities[action.payload.id];
			})
		);
	}

	/**
	 * @description Deactivates a campaign
	 * @param ctx
	 * @param action
	 */
	@Action(Campaigns.ToggleStatus)
	deactivate(ctx: StateContext<CampaignsStateModel>, action: Campaigns.ToggleStatus): void {
		this._log.info(`[CampaignsStore] Deactivating campaign with id: ${action.payload.id}.`, this);
		ctx.setState(
			produce((draft: CampaignsStateModel) => {
				draft.entities[action.payload.id].active = false;
			})
		);
	}

	/**
	 * @description Updates a campaign
	 * @param ctx
	 * @param action
	 */
	@Action(Campaigns.Update)
	update(ctx: StateContext<CampaignsStateModel>, action: Campaigns.Update): void {
		this._log.info(`[CampaignsStore] Updating campaign with id: ${action.payload.id}.`, this);
		ctx.setState(
			produce((draft: CampaignsStateModel) => {
				draft.entities[action.payload.id] = updateEntity(action.payload, draft.entities[action.payload.id]);
			})
		);
	}
}
