import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
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
	 * @description When user requests to delete their virtual assistant.
	 */
	@Output() deleteAssistant = new EventEmitter<void>();

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
	 * @description Event handler when user requests to disconnect account from virtual assistant.
	 */
	_onDeleteVirtualAssistant(): void {
		this._log.debug('Deleting virtual assistant', this);
		this._inProgress = true;
		this.deleteAssistant.emit();
	}

	/**
	 * @description Gets timezone id.
	 * @returns timezone id
	 */
	_getTimezoneId(): string {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const timezoneId = this._form?.get('timezoneId').value?.timezoneId as string;
		return timezoneId ? timezoneId : '';
	}
}
