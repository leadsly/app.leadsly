import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';

/**
 * @description Disconnected account component.
 */
@Component({
	selector: 'ldsly-disconnected-account',
	templateUrl: './disconnected-account.component.html',
	styleUrls: ['./disconnected-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisconnectedAccountComponent {
	/**
	 * @description Output  of disconnected account component
	 */
	@Output() setupClicked = new EventEmitter<void>();

	/**
	 * Creates an instance of disconnected account component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Event handler when user clicks to link their account.
	 */
	_onSetupClicked(): void {
		this._log.info('[_onSetupClicked] executed.');
		this.setupClicked.emit();
	}
}
