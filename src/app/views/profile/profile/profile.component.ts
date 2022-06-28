import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConnectedAccount } from 'app/core/models/connected-account';

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
export class ProfileComponent {
	/**
	 * @description User's linked accounts.
	 */
	_connectedAccount$: Observable<ConnectedAccount>;

	/**
	 * Creates an instance of profile component.
	 * @param _sb
	 */
	constructor(private _sb: ProfileSandboxService) {
		this._connectedAccount$ = _sb.connectedAccount$;
	}
}
