import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConnectedAccount } from 'app/core/models/connected-account';
import { TimeZone } from 'app/core/models/time-zone.model';
import { Observable } from 'rxjs';
import { ProfileSandboxService } from '../profile-sandbox.service';

/**
 * @description User's profile component.
 */
@Component({
	selector: 'ldsly-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
	/**
	 * @description User's linked accounts.
	 */
	_connectedAccount$: Observable<ConnectedAccount>;

	/**
	 * @description Leadsly supported timezones.
	 */
	_timeZones$: Observable<TimeZone[]>;

	/**
	 * Creates an instance of profile component.
	 * @param _sb
	 */
	constructor(private _sb: ProfileSandboxService) {
		this._connectedAccount$ = _sb.connectedAccount$;
	}

	/**
	 * @description NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._timeZones$ = this._sb.getSupportedTimeZones$();
	}
}
