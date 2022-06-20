import { Injectable } from '@angular/core';
import { Selector, State, StateToken } from '@ngxs/store';
import { LeadslyStateModel } from './leadsly-state-model';

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
}
