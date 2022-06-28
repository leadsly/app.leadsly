import { Injectable } from '@angular/core';
import { State, StateToken } from '@ngxs/store';
import { LogService } from 'app/core/logger/log.service';

import { ProfileStateModel } from './profile-state.model';

const PROFILE_STATE_TOKEN = new StateToken<ProfileStateModel>('profile');

/**
 * @description User's profile state.
 */
@State<ProfileStateModel>({
	name: PROFILE_STATE_TOKEN,
	defaults: {}
})
@Injectable()
export class ProfileState {
	/**
	 * Creates an instance of profile state.
	 * @param _log
	 */
	constructor(private _log: LogService) {}
}
