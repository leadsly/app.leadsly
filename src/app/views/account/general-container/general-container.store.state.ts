import { StateToken, State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import * as GeneralContainer from './general-container.store.actions';
import produce from 'immer';
import { GeneralContainerStateModel } from './general-container-state.model';
import { AccountGeneralDetails } from 'app/core/models/account-general-details.model';
import { LogService } from 'app/core/logger/log.service';

const ACCOUNT_GENERAL_STATE_TOKEN = new StateToken<GeneralContainerStateModel>('general');

@State<GeneralContainerStateModel>({
	name: ACCOUNT_GENERAL_STATE_TOKEN,
	defaults: {
		email: '',
		verified: false
	}
})
@Injectable()
/**
 * Provides state for user account general tab.
 */
export class AccountGeneralState {
	/**
	 * Selects account general settings.
	 * @param state
	 * @returns account general details
	 */
	@Selector([ACCOUNT_GENERAL_STATE_TOKEN])
	static selectAccountGeneralDetails(state: GeneralContainerStateModel): AccountGeneralDetails {
		return state as AccountGeneralDetails;
	}

	/**
	 * Creates an instance of account general state.
	 * @param log
	 */
	constructor(private log: LogService) {}

	/**
	 * Action handler for setting general details settings.
	 * @param ctx
	 * @param action
	 */
	@Action(GeneralContainer.SetAccountGeneralDetails)
	setAccountGeneralDetails(ctx: StateContext<GeneralContainerStateModel>, action: GeneralContainer.SetAccountGeneralDetails): void {
		this.log.info('setAccountGeneralDetails action handler fired.', this);
		ctx.setState(
			produce((draft: GeneralContainerStateModel) => {
				draft = { ...draft, ...action.payload };
				return draft;
			})
		);
	}
}
