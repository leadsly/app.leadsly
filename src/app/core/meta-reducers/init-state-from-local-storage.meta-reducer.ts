import { getActionTypeFromInstance } from '@ngxs/store';
import { LocalStorageService } from '../local-storage/local-storage.service';

/**
 * Represents the initial action dispatched by NGXS when first initialized.
 * NGXS dispatches this event when store is being initialized, before all the ngxsOnInit Life-cycle events.
 */
const INIT = '@@INIT';

/**
 * Dispatched by NGXS when a new lazy-loaded state being added to the store.
 */
const UPDATE = '@@UPDATE_STATE';

/**
 * Inits state from local storage when action type is @@INIT.
 * @param state
 * @param action
 * @param next
 * @returns updated state.
 */
export function initStateFromLocalStorage(state: any, action: any, next: any): any {
	if ([INIT, UPDATE].includes(getActionTypeFromInstance(action))) {
		state = { ...state, ...LocalStorageService.loadInitialState() };
	}
	return next(state, action);
}
