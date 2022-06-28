import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { OperationResponse } from 'app/core/models/operation-response.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { map, Observable, shareReplay, tap } from 'rxjs';
import * as Leadsly from '../../core/leadsly/leadsly.store.actions';
import { LeadslyState } from './../../core/leadsly/leadsly.store.state';
import { ConnectedAccount } from './../../core/models/connected-account';
import { ProfileAsyncService } from './../../core/services/profile-async.service';

/**
 * @description Profile sandbox service
 */
@Injectable()
export class ProfileSandboxService {
	/**
	 * @description Selects user's linked accounts.
	 */
	@Select(LeadslyState.selectConnectedAccount) connectedAccount$: Observable<ConnectedAccount>;

	/**
	 * Creates an instance of profile sandbox service.
	 * @param _store
	 * @param _profileAsyncService
	 */
	constructor(private _store: Store, private _profileAsyncService: ProfileAsyncService) {}

	/**
	 * @description Gets supported time zones.
	 */
	getSupportedTimeZones$(): Observable<TimeZone[]> {
		return this._profileAsyncService.getSupportedTimeZones$().pipe(
			tap((resp: OperationResponse) => this._store.dispatch(new Leadsly.SetSupportedTimeZones({ timeZones: resp.data as TimeZone[] }))),
			map((resp) => resp.data as TimeZone[]),
			shareReplay()
		);
	}
}
