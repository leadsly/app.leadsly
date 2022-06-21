import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import produce from 'immer';
import { LogService } from './../logger/log.service';
import { LeadslyStateModel } from './leadsly-state-model';
import * as Leadsly from './leadsly.store.actions';

const LEADSLY_STATE_TOKEN = new StateToken<LeadslyStateModel>('leadsly');

@State<LeadslyStateModel>({
	name: LEADSLY_STATE_TOKEN,
	defaults: {
		connectedAccount: '',
		halId: ''
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
		return state.connectedAccount;
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
	 *
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Actions leadsly state
	 * @param ctx
	 * @param action
	 * @returns connected account
	 */
	@Action(Leadsly.AddConnectedAccount)
	addConnectedAccount(ctx: StateContext<LeadslyStateModel>, action: Leadsly.AddConnectedAccount): void {
		this._log.info('addConnectedAccount action handler fired.');
		console.log(action);
		ctx.setState(
			produce((draft: LeadslyStateModel) => {
				draft.connectedAccount = action.payload.leadslyDetails.connectedAccount;
				draft.halId = action.payload.leadslyDetails.halId;
				return draft;
			})
		);
	}
}
