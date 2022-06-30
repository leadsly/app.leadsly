import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { AuthState } from '../auth/auth.store.state';
import * as Leadsly from '../leadsly/leadsly.store.actions';

import { Connected } from '../models/connected.model';

import { LinkedInAccountAsyncService } from './linkedin-account-async.service';

/**
 * @description Creates LinkedInAccount service.
 */
@Injectable({
	providedIn: 'root'
})
export class LinkedInAccountService {
	/**
	 * Creates an instance of linked in account service.
	 * @param _store
	 */
	constructor(private _store: Store, private _linkedInAccountAsyncService: LinkedInAccountAsyncService) {}

	/**
	 * @description Gets connected account
	 * @returns connected account$
	 */
	getConnectedAccount$(): Observable<Connected> {
		const userId = this._store.selectSnapshot(AuthState.selectCurrentUserId);
		return this._linkedInAccountAsyncService
			.getIsConnected$(userId)
			.pipe(tap((resp) => this._store.dispatch(new Leadsly.SetConnected({ connected: resp }))));
	}
}
