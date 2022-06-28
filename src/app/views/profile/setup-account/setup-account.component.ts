import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { LinkAccount } from './../../../core/models/profile/link-account.model';

/**
 * @description Setup account component.
 */
@Component({
	selector: 'ldsly-setup-account',
	templateUrl: './setup-account.component.html',
	styleUrls: ['./setup-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupAccountComponent {
	/**
	 * @description Sets available time zones.
	 * @param value
	 */
	@Input() set availableTimeZones(value: TimeZone[]) {
		if (value) {
			this._availableTimeZones = value;
		}
	}

	/**
	 * @description Available time zones.
	 */
	_availableTimeZones: TimeZone[] = [];

	/**
	 * @description Sets the form group for new assistant form.
	 */
	@Input() set newAssistantForm(value: FormGroup) {
		if (value) {
			this._newAssistantForm = value;
		}
	}

	/**
	 * @description Form group for new assistant form.
	 */
	_newAssistantForm: FormGroup;

	/**
	 * @description Sets the form group for link account form.
	 */
	@Input() set linkAccountForm(value: FormGroup) {
		if (value) {
			this._linkAccountForm = value;
		}
	}

	/**
	 * @description Link account form of setup account component.
	 */
	_linkAccountForm: FormGroup;

	/**
	 * @description Orientation of setup account component
	 */
	_orientation: 'vertical' | 'horizontal' = 'vertical';

	/**
	 * Creates an instance of setup account component.
	 * @param _log
	 * * @param _fb
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description When user submits the new assistant form.
	 */
	_onNewAssistantRequsted(event: SetupVirtualAssistant): void {
		this._log.info('[_onNewAssistantSubmitted] executed.');
	}

	/**
	 * @description Executed when user submits the link account form.
	 */
	_onLinkAccountRequested(event: LinkAccount): void {
		this._log.info('[_onLinkAccountSubmitted] executed.');
	}

	/**
	 * @description Executed when user completes setting up his account with leadsly.
	 */
	_onFinishClicked(): void {
		this._log.info('[_onFinishClicked] executed.');
	}
}
