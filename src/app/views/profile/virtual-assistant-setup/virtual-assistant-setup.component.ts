import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { LDSLY_SMALL_SPINNER_DIAMETER, LDSLY_SMALL_SPINNER_STROKE_WIDTH } from 'app/shared/global-settings/mat-spinner-settings';

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
	 * @description Whether virtual assistant creation is in progress.
	 */
	@Input() set inProgress(value: boolean) {
		this._log.debug('[VirtualAssistantSetupComponent] inProgress setter executed', this, value);
		this._inProgress = value;
	}

	_inProgress = false;

	/**
	 * @description Whether server error occured.
	 */
	@Input() set serverErrorOccured(value: boolean) {
		this._inProgress = !value;
	}

	/**
	 * Verified next step button spinner diameter.
	 */
	readonly _spinnerDiameter = LDSLY_SMALL_SPINNER_DIAMETER;

	/**
	 * Verified next step button spinner stroke width.
	 */
	readonly _spinnerStrokeWidth = LDSLY_SMALL_SPINNER_STROKE_WIDTH;

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
		if (this._newAssistantForm.get('username').hasError('required')) {
			return 'You must enter a value';
		} else if (this._newAssistantForm.get('username').hasError('email')) {
			return 'Not a valid email';
		}

		return this._newAssistantForm.get('timezoneId').hasError('required') ? 'Time zone is required' : '';
	}
}
