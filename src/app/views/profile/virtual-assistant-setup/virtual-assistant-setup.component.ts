import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { TimeZone } from 'app/core/models/time-zone.model';

/**
 * @description Virtual assistant setup component.
 */
@Component({
	selector: 'ldsly-virtual-assistant-setup',
	templateUrl: './virtual-assistant-setup.component.html',
	styleUrls: ['./virtual-assistant-setup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualAssistantSetupComponent {
	/**
	 * @description Sets the form group for new assistant form.
	 */
	@Input() set form(value: FormGroup) {
		if (value) {
			this._newAssistantForm = value;
		}
	}

	/**
	 * @description Form group for new assistant form.
	 */
	_newAssistantForm: FormGroup;

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
	 * @description Event emitter when user clicks to create new virtual assistant.
	 */
	@Output() newAssistantRequested = new EventEmitter<SetupVirtualAssistant>();

	/**
	 * Creates an instance of virtual assistant setup component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Event emitter when user clicks on create virtual assistant button.
	 */
	_onFormSubmitted(): void {
		this._log.trace('[onCreateVirtualAssistantClicked] Create virtual assistant button clicked');
		const newAssistantRequest = this._newAssistantForm.value as SetupVirtualAssistant;
		this.newAssistantRequested.emit(newAssistantRequest);
	}

	/**
	 * @description Gets error message for the given field.
	 * @returns error messages
	 */
	_getErrorMessages(): string {
		if (this._newAssistantForm.get('email').hasError('required')) {
			return 'You must enter a value';
		} else if (this._newAssistantForm.get('email').hasError('email')) {
			return 'Not a valid email';
		}

		return this._newAssistantForm.get('timezoneId').hasError('required') ? 'Time zone is required' : '';
	}
}
