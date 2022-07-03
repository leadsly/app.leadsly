import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { LDSLY_SMALL_SPINNER_DIAMETER, LDSLY_SMALL_SPINNER_STROKE_WIDTH } from 'app/shared/global-settings/mat-spinner-settings';

/**
 * @description Create virtual assistant component.
 */
@Component({
	selector: 'ldsly-create-virtual-assistant',
	templateUrl: './create-virtual-assistant.component.html',
	styleUrls: ['./create-virtual-assistant.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateVirtualAssistantComponent {
	/**
	 * @description Sets in progress flag to false on error.
	 */
	@Input() set serverErrorOccured(value: ProblemDetails | InternalServerErrorDetails) {
		this._log.debug('serverErrorOccured setter executed', this, value);
		this._inProgress = false;
	}

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
	 * @description Event emitter when user requests to create a new virtual assistant.
	 */
	@Output() createVirtualAssistant = new EventEmitter<SetupVirtualAssistant>();

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
	 * Creates an instance of create virtual assistant component.
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
		this.createVirtualAssistant.emit(setup);
	}

	/**
	 * @description Gets error message for the given field.
	 * @returns error messages
	 */
	_getErrorMessages(): string {
		return this._form.get('timezoneId').hasError('required') ? 'Time zone is required' : '';
	}
}
