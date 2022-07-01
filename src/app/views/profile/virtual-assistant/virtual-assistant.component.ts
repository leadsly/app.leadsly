import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { VirtualAssistantInfo } from 'app/core/models/profile/virtual-assistant-info.model';

import { TimeZone } from 'app/core/models/time-zone.model';
import { LDSLY_SMALL_SPINNER_DIAMETER, LDSLY_SMALL_SPINNER_STROKE_WIDTH } from 'app/shared/global-settings/mat-spinner-settings';

/**
 * @description Virtual assistant component.
 */
@Component({
	selector: 'ldsly-virtual-assistant',
	templateUrl: './virtual-assistant.component.html',
	styleUrls: ['./virtual-assistant.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualAssistantComponent {
	/**
	 * @description Sets in progress flag to false on error.
	 */
	@Input() set serverErrorOccured(value: boolean) {
		this._inProgress = false;
	}
	/**
	 * @description Sets virtual assistant.
	 * @param value
	 */
	@Input() set virtualAssistantInfo(value: VirtualAssistantInfo) {
		this._inProgress = value.assistant ? false : this._inProgress;
		this._virtualAssistantInfo = value;
	}

	_virtualAssistantInfo: VirtualAssistantInfo;

	/**
	 * @description Sets new virtual assistant form.
	 */
	@Input() set form(value: FormGroup) {
		this._log.debug('Virtual assistant form', this, value);
		this._form = value;
	}

	_form: FormGroup;

	/**
	 * @description Sets supported time zones.
	 */
	@Input() set timeZones(value: TimeZone[]) {
		this._timeZones = value;
	}

	_timeZones: TimeZone[] = [];

	/**
	 * @description When user requested to create a new virtual assistant.
	 */
	@Output() requested = new EventEmitter<SetupVirtualAssistant>();

	/**
	 * Button spinner diameter.
	 */
	readonly _spinnerDiameter = LDSLY_SMALL_SPINNER_DIAMETER;

	/**
	 * Button spinner stroke width.
	 */
	readonly _spinnerStrokeWidth = LDSLY_SMALL_SPINNER_STROKE_WIDTH;

	/**
	 * @description Determines whether request to create new virtual assistant is in progress.
	 */
	_inProgress = false;

	/**
	 * Creates an instance of virtual assistant component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Event handler when user submits a form.
	 */
	_onSubmit(): void {
		const setup = this._form.value as SetupVirtualAssistant;
		this._log.debug('_onSubmit', this, setup);
		this._inProgress = true;
		this.requested.emit(setup);
	}

	/**
	 * @description Gets error message for the given field.
	 * @returns error messages
	 */
	_getErrorMessages(): string {
		return this._form.get('timezoneId').hasError('required') ? 'Time zone is required' : '';
	}

	_getTimezoneId(): string {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const timezoneId = this._form?.get('timezoneId').value?.timezoneId as string;
		return timezoneId ? timezoneId : '';
	}
}
