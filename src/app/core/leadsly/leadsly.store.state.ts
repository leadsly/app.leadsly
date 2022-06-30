import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import produce from 'immer';
import { LeadslyConnectResult } from '../models/profile/leadsly-connect-result.model';
import { VirtualAssistant } from '../models/profile/virtual-assistant.model';
import { TimeZone } from '../models/time-zone.model';
import { LogService } from './../logger/log.service';
import { LeadslyStateModel } from './leadsly-state-model';
import * as Leadsly from './leadsly.store.actions';

const LEADSLY_STATE_TOKEN = new StateToken<LeadslyStateModel>('leadsly');

@State<LeadslyStateModel>({
	name: LEADSLY_STATE_TOKEN,
	defaults: {
		connected: {
			isConnected: false,
			connectedAccount: {}
		},
		timeZones: [],
		virtualAssistant: {},
		connect: {}
	}
})
@Injectable()

/**
 * @description Leadsly state.
 */
export class LeadslyState {
	/**
	 * @description Selects user's connected account.
	 * @param state
	 * @returns connected account
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectConnectedAccount(state: LeadslyStateModel): string {
		return state.connectedAccount.email;
	}

	/**
	 * @description Selects if user is connected to virtual assistant.
	 * @param state
	 * @returns true if is connected
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectIsConnected(state: LeadslyStateModel): boolean {
		return state.connected.isConnected;
	}

	/**
	 * @description Selects whether user has already created virtual assistant.
	 * @param state
	 * @returns true if is virtual assistant created
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectIsVirtualAssistantCreated(state: LeadslyStateModel): boolean {
		return Object.keys(state.virtualAssistant).length > 0;
	}

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
	 * @description Selects hal id for this connected account.
	 * @param state
	 * @returns hal id
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectHalId(state: LeadslyStateModel): string {
		return state.halId;
	}

	/**
	 * @description Selects leadsly's setup result.
	 * @param state
	 * @returns leadsly setup result
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectLeadslySetupResult(state: LeadslyStateModel): VirtualAssistant {
		return state.virtualAssistant;
	}

	/**
	 * @description Selects leadsly connect result
	 * @param state
	 * @returns leadsly connect result
	 */
	@Selector([LEADSLY_STATE_TOKEN])
	static selectLeadslyConnectResult(state: LeadslyStateModel): LeadslyConnectResult {
		return state.connect;
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
	@Action(Leadsly.SetVirtualAssistant)
	setVirtualAssistant(ctx: StateContext<LeadslyStateModel>, action: Leadsly.SetVirtualAssistant): void {
		this._log.info('createVirtualAssistant action handler fired.', this, action);
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft = { ...draft, ...action.payload };
				return draft;
			})
		);
	}

	/**
	 * @description Event handler when setting is connected information.
	 * @param ctx
	 * @param action
	 */
	@Action(Leadsly.SetConnected)
	setConnected(ctx: StateContext<LeadslyStateModel>, action: Leadsly.SetConnected): void {
		this._log.info('setConnected action handler fired.', this, action);
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft = { ...draft, ...action.payload };
				return draft;
			})
		);
	}

	/**
	 * @description Event handler when user finishes leadsly connect result.
	 * @param ctx
	 * @param action
	 */
	@Action(Leadsly.ConnectAccountSetupResult)
	connectAccountSetupResult(ctx: StateContext<LeadslyStateModel>, action: Leadsly.ConnectAccountSetupResult): void {
		this._log.info('connectAccountSetupResult action handler fired.', this, action);
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft = { ...draft, ...action.payload };
				return draft;
			})
		);
	}
}
