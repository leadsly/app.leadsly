import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LdslyValidators } from 'app/core/form-validators/ldsly-validators';
import { LogService } from 'app/core/logger/log.service';
import { ConnectedAccount } from 'app/core/models/connected-account';
import { TimeZone } from 'app/core/models/time-zone.model';

/**
 * @description Linked account component.
 */
@Component({
	selector: 'ldsly-linked-account',
	templateUrl: './linked-account.component.html',
	styleUrls: ['./linked-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkedAccountComponent implements OnInit {
	/**
	 * @description Setup form group.
	 */
	_setupForm: FormGroup;

	/**
	 * @description New assistant form.
	 */
	_newAssistantForm: FormGroup;

	/**
	 * @description User's linked account.
	 */
	@Input() set connectedAccount(value: ConnectedAccount) {
		this._connectedAccount = value;
	}

	/**
	 * @description Sets the available time zones.
	 */
	@Input() set supportedTimeZones(value: TimeZone[]) {
		this._timeZones = value;
	}

	/**
	 * @description Available time zones.
	 */
	_timeZones: TimeZone[] = [];

	/**
	 * @description User's linked account.
	 */
	_connectedAccount: ConnectedAccount;

	/**
	 * Creates an instance of linked account component.
	 * @param _log
	 */
	constructor(private _log: LogService, private _fb: FormBuilder) {}

	/**
	 * @description NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('[SetupAccountComponent] Initialized.');
		this._initForms();
	}

	/**
	 * @description Initializes forms.
	 */
	private _initForms(): void {
		this._setupForm = this._buildSetupForm();
		this._newAssistantForm = this._buildNewAssistantForm();
	}

	/**
	 * @description Builds setup form.
	 * @returns setup form
	 */
	private _buildSetupForm(): FormGroup {
		return this._fb.group({
			email: this._fb.control('', [LdslyValidators.required, LdslyValidators.email]),
			password: this._fb.control('', [LdslyValidators.required])
		});
	}

	/**
	 * @description Builds new assistant form.
	 * @returns new assistant form
	 */
	private _buildNewAssistantForm(): FormGroup {
		return this._fb.group({
			email: this._fb.control('', [LdslyValidators.required, LdslyValidators.email]),
			timezoneId: this._fb.control('', [LdslyValidators.required])
		});
	}

	/**
	 * @description Event handler for when user clicks on setup account.
	 */
	_onSetupClicked(): void {
		this._log.info('[_onSetupClicked] executed.');
	}
}
