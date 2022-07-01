import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import produce from 'immer';
import { ConnectedInfo } from './../models/connected-info.model';
import { VirtualAssistantInfo } from './../models/profile/virtual-assistant-info.model';

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
}
