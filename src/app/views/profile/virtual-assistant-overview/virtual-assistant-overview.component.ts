import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';

import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { VirtualAssistantInfo } from 'app/core/models/profile/virtual-assistant-info.model';
import { TimeZone } from 'app/core/models/time-zone.model';

/**
 * @description Virtual assistant overview component.
 */
@Component({
	selector: 'ldsly-virtual-assistant-overview',
	templateUrl: './virtual-assistant-overview.component.html',
	styleUrls: ['./virtual-assistant-overview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualAssistantOverviewComponent {
	/**
	 * @description Sets in progress flag to false on error.
	 */
	@Input() set serverErrorOccured(value: ProblemDetails | InternalServerErrorDetails) {
		this._log.debug('serverErrorOccured setter executed', this, value);
		this._serverErrorOccured = value;
	}

	_serverErrorOccured: ProblemDetails | InternalServerErrorDetails;

	/**
	 * @description Sets virtual assistant.
	 * @param value
	 */
	@Input() set virtualAssistantInfo(value: VirtualAssistantInfo) {
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
	 * @description Event emitter when user requested to create a new virtual assistant.
	 */
	@Output() createAssistant = new EventEmitter<SetupVirtualAssistant>();

	/**
	 * @description Event emitter when user wants to disconnect from virtual assistant.
	 */
	@Output() deleteAssistant = new EventEmitter<void>();

	/**
	 * Creates an instance of virtual assistant overview component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Event handler when user wants to create a new vritaul assistant.
	 * @param event
	 */
	_onVirtualAssistantRequested(event: SetupVirtualAssistant): void {
		this._log.debug('_onVirtualAssistantRequested event handler fired', this, event);
		this.createAssistant.emit(event);
	}

	/**
	 * @description Event handler when user wants to delete virtual assistant.
	 */
	_onDeleteRequested(): void {
		this._log.debug('_onDeleteRequested event handler fired', this);
		this.deleteAssistant.emit();
	}
}
