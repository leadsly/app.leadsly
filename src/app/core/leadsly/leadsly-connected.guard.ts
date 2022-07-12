import { LeadslyState } from 'app/core/leadsly/leadsly.store.state';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { NotificationService } from '../core.module';
import { LogService } from '../logger/log.service';

/**
 * @description Whether user is connected with virtual assistant guard.
 */
@Injectable({
	providedIn: 'root'
})
export class LeadslyConnectedGuard implements CanActivate {
	/**
	 * Creates an instance of is leadsly connected guard.
	 * @param _store
	 * @param _log
	 */
	constructor(private _store: Store, private _log: LogService, private _notificationService: NotificationService) {}

	/**
	 * @description Determines whether user can active this route.
	 * @param route
	 * @param state
	 * @returns activate
	 */
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this._store.selectOnce(LeadslyState.selectIsUserConnected).pipe(
			map((isConnected) => {
				if (isConnected === false) {
					this._notificationService.info('You must first link your account');
				}
				return isConnected;
			})
		);
	}
}
