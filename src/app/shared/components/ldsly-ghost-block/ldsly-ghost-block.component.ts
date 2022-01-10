import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { LdslyGhostAnimationService } from 'app/shared/services/ldsly-ghost-animation.service';

/**
 * Ghosting component.
 */
@Component({
	selector: 'ldsly-ghost-block',
	templateUrl: './ldsly-ghost-block.component.html',
	styleUrls: ['./ldsly-ghost-block.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LdslyGhostBlockComponent implements OnInit {
	/**
	 * Host binding of ghost block component indicating busy state.
	 */
	@HostBinding('attr.aria-busy') busy = true;

	/**
	 * Creates an instance of ghost block component.
	 * @param _ghostAnimationService
	 * @param _log
	 */
	constructor(private _ghostAnimationService: LdslyGhostAnimationService, private _log: LogService) {}

	/**
	 * NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('Initialized.', this);
		this._ghostAnimationService.syncAnimation();
	}
}
