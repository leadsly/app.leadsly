import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import produce from 'immer';
import { ConnectedInfo } from './../models/connected-info.model';
import { VirtualAssistantInfo } from './../models/profile/virtual-assistant-info.model';

import { TwoFactorAuthResult } from '../models/profile/two-factor-auth-result.model';
import { TimeZone } from '../models/time-zone.model';
import { LogService } from './../logger/log.service';
import { LeadslyStateModel } from './leadsly-state-model';
import * as Leadsly from './leadsly.store.actions';

const LEADSLY_STATE_TOKEN = new StateToken<LeadslyStateModel>('leadsly');

@State<LeadslyStateModel>({
	name: LEADSLY_STATE_TOKEN,
	defaults: {
		connectedInfo: {
			isConnected: false,
			connectedAccount: {}
		},
		timeZones: [],
		virtualAssistantInfo: {
			created: false,
			assistant: {}
		}
	}
})
@Injectable()

/**
 * @description Leadsly state.
 */
export class LeadslyState {
	/**
	 * @description Selects leadsly's supported timezones.
	 * @param state
	 * @returns supported timezones
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectSupportedTimeZones(state: LeadslyStateModel): TimeZone[] {
		return state.timeZones;
	}

	/**
	 * @description Selects user's virtual assistant info.
	 * @param state
	 * @returns virtual assistant info
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectVirtualAssistantInfo(state: LeadslyStateModel): VirtualAssistantInfo {
		return state.virtualAssistantInfo;
	}

	/**
	 * @description Selects user's connected info regarding virtual assistant.
	 * @param state
	 * @returns connected info
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectConnectedInfo(state: LeadslyStateModel): ConnectedInfo {
		return state.connectedInfo;
	}

	/**
	 * @description Selects virtual assistant id.
	 * @param state
	 * @returns virtual assistant id
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectVirtualAssistantId(state: LeadslyStateModel): string {
		return state.virtualAssistantInfo.assistant.virtualAssistantId;
	}

	/**
	 * @description Selects connect linked in account result.
	 * @param state
	 * @returns connect linked in account result
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectConnectLinkedInAccountResult(state: LeadslyStateModel): ConnectLinkedInAccountResult {
		return state.connectLinkedInAccountResult;
	}

	/**
	 * @description Selects two factor auth result.
	 * @param state
	 * @returns two factor auth result
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectTwoFactorAuthResult(state: LeadslyStateModel): TwoFactorAuthResult {
		return state.twoFactorAuthResult;
	}

	/**
	 * Creates an instance of leadsly state.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Sets supported timezones.
	 * @param ctx
	 * @param action
	 */
	@Action(Leadsly.SetSupportedTimeZones)
	setSupportedTimeZones(ctx: StateContext<LeadslyStateModel>, action: Leadsly.SetSupportedTimeZones): void {
		this._log.info('setSupportedTimeZones action handler fired.');
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft = { ...draft, ...action.payload };
				return draft;
			})
		);
	}

	/**
	 * @description Event handler for when user finishes virtual assistant setup.
	 * @param ctx
	 * @param action
	 */
	@Action(Leadsly.SetVirtualAssistantInfo)
	setVirtualAssistantInfo(ctx: StateContext<LeadslyStateModel>, action: Leadsly.SetVirtualAssistantInfo): void {
		this._log.info('setVirtualAssistantInfo action handler fired.', this, action);
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft = { ...draft, ...action.payload };
				return draft;
			})
		);
	}

	/**
	 * @description Event handler when user connects linked in account.
	 * @param ctx
	 * @param action
	 */
	@Action(Leadsly.SetConnectLinkedInAccountResult)
	setConnectLinkedInAccountResult(ctx: StateContext<LeadslyStateModel>, action: Leadsly.SetConnectLinkedInAccountResult): void {
		this._log.info('setConnectLinkedInAccountResult action handler fired.', this, action);
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft.connectLinkedInAccountResult = action.payload.connectLinkedInAccountResult;
				return draft;
			})
		);
	}

	/**
	 * @description Event handler when user enters two factor auth code.
	 * @param ctx
	 * @param action
	 */
	@Action(Leadsly.SetTwoFactorAuthResult)
	setTwoFactorAuthResult(ctx: StateContext<LeadslyStateModel>, action: Leadsly.SetTwoFactorAuthResult): void {
		this._log.info('setTwoFactorAuthResult action handler fired.', this, action);
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft.twoFactorAuthResult = action.payload.twoFactorAuthResult;
				return draft;
			})
		);
	}

	/**
	 * @description Creates new virtual assistant.
	 * @param ctx
	 * @param action
	 */
	@Action(Leadsly.CreateVirtualAssistant)
	createVirtualAssistant(ctx: StateContext<LeadslyStateModel>, action: Leadsly.CreateVirtualAssistant): void {
		this._log.info('createVirtualAssistant action handler fired.', this, action);
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft.virtualAssistantInfo.assistant = action.payload.assistant;
				draft.virtualAssistantInfo.created = true;
				return draft;
			})
		);
	}

	/**
	 * @description Event handler when setting is connected information.
	 * @param ctx
	 * @param action
	 */
	@Action(Leadsly.SetConnectedInfo)
	setConnectedInfo(ctx: StateContext<LeadslyStateModel>, action: Leadsly.SetConnectedInfo): void {
		this._log.info('setConnectedInfo action handler fired.', this, action);
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft = { ...draft, ...action.payload };
				return draft;
			})
		);
	}

	/**
	 * @description Deletes virtual assistant.
	 * @param ctx
	 * @param action
	 */
	@Action(Leadsly.DeleteVirtualAssistant)
	deleteVirtualAssistant(ctx: StateContext<LeadslyStateModel>, action: Leadsly.DeleteVirtualAssistant): void {
		this._log.info('deleteVirtualAssistant action handler fired.', this, action);
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft.virtualAssistantInfo.created = false;
				draft.virtualAssistantInfo.assistant = {};
				draft.connectedInfo.isConnected = false;
				draft.connectedInfo.connectedAccount = {};
				return draft;
			})
		);
	}
}
