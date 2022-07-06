import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { LDSLY_SMALL_SPINNER_DIAMETER, LDSLY_SMALL_SPINNER_STROKE_WIDTH } from 'app/shared/global-settings/mat-spinner-settings';

/**
 * @description Connected account copmonent.
 */
@Component({
	selector: 'ldsly-connected-account',
	templateUrl: './connected-account.component.html',
	styleUrls: ['./connected-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectedAccountComponent {
	/**
	 * @description Sets in progress flag to false on error.
	 */
	@Input() set serverErrorOccured(value: ProblemDetails | InternalServerErrorDetails) {
		this._log.debug('serverErrorOccured setter executed', this, value);
		this._inProgress = false;
	}

	/**
	 * @description Sets link account form.
	 */
	@Input() set form(value: FormGroup) {
		this._log.debug('form setter executed', this, value);
		this._form = value;
	}

	_form: FormGroup;

	/**
	 * @description Event emitter when user requests to disconnect from virtual assistant.
	 */
	@Output() disconnect = new EventEmitter<void>();

	/**
	 * Button spinner diameter.
	 */
	readonly _spinnerDiameter = LDSLY_SMALL_SPINNER_DIAMETER;

	/**
	 * Button spinner stroke width.
	 */
	readonly _spinnerStrokeWidth = LDSLY_SMALL_SPINNER_STROKE_WIDTH;

	/**
	 * @description Determines whether request to link account to virtual assistant is in progress.
	 */
	_inProgress = false;

	/**
	 * Creates an instance of connected account component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	ngOnInit(): void {
		this._log.debug('OnInit', this, this._form);
	}

	/**
	 * @description Event handler when user requests to disconnect from virtual assistant
	 */
	_onDisconnectRequested(): void {
		this._log.debug('_onDisconnectRequested event handler fired', this);
		this.disconnect.emit();
	}
}
