import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { LogService } from 'app/core/logger/log.service';
import { ConnectedAccount } from 'app/core/models/connected-account';

/**
 * @description Linked account component.
 */
@Component({
	selector: 'ldsly-linked-account',
	templateUrl: './linked-account.component.html',
	styleUrls: ['./linked-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkedAccountComponent {
	/**
	 * @description User's linked account.
	 */
	@Input() set connectedAccount(value: ConnectedAccount) {
		this._connectedAccount = value;
	}

	/**
	 * @description User's linked account.
	 */
	_connectedAccount: ConnectedAccount;

	/**
	 * Creates an instance of linked account component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Event handler for when user clicks on setup account.
	 */
	_onSetupClicked(): void {
		this._log.info('[_onSetupClicked] executed.');
	}
}
