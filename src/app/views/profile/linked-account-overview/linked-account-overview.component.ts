import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { ConnectedInfo } from 'app/core/models/connected-info.model';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { LinkAccount } from 'app/core/models/profile/link-account.model';

/**
 * @description Linked account overview component.
 */
@Component({
	selector: 'ldsly-linked-account-overview',
	templateUrl: './linked-account-overview.component.html',
	styleUrls: ['./linked-account-overview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkedAccountOverviewComponent {
	/**
	 * @description Sets in progress flag to false on error.
	 */
	@Input() set serverErrorOccured(value: ProblemDetails | InternalServerErrorDetails) {
		this._log.debug('serverErrorOccured setter executed', this, value);
		this._serverErrorOccured = value;
	}

	/**
	 * @description Server error occured.
	 */
	_serverErrorOccured: ProblemDetails | InternalServerErrorDetails;

	/**
	 * @description Whether this expansion panel is disabled.
	 */
	@Input() disabled = true;

	/**
	 * @description Sets account value.
	 */
	@Input() set connectedInfo(value: ConnectedInfo) {
		this._connectedInfo = value;
	}

	_connectedInfo: ConnectedInfo;

	/**
	 * @description Sets link account form.
	 */
	@Input() set form(value: FormGroup) {
		this._log.debug('form setter executed', this, value);
		this._form = value;
	}

	_form: FormGroup;

	/**
	 * @description Sets connect linked in account result.
	 */
	@Input() set connectLinkedInAccountResult(value: ConnectLinkedInAccountResult) {
		this._log.debug('connectLinkedInAccountResult setter executed', this, value);
		this._connectLinkedInAccountResult = value;
	}

	_connectLinkedInAccountResult: ConnectLinkedInAccountResult;

	/**
	 * @description Event emitter when user clicks to link their account to virtual assistant.
	 */
	@Output() connect = new EventEmitter<LinkAccount>();

	/**
	 * @description Event emitter when user clicks to disconnect their account from virtual assistant.
	 */
	@Output() disconnect = new EventEmitter<void>();

	/**
	 * Creates an instance of linked account overview component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Event handler when user requests to link his linked in account to virtual assistant.
	 * @param event
	 */
	_onConnectToVirtualAssistant(event: LinkAccount): void {
		this._log.debug('_onConnectToVirtualAssistant event handler fired.', this, event);
		this.connect.emit(event);
	}

	/**
	 * @description Event handler when user requests to disconnect his linked in account from virtual assistant.
	 */
	_onDisconnectRequested(): void {
		this._log.debug('_onDisconnectRequested event handler fired.', this);
		this.disconnect.emit();
	}
}
