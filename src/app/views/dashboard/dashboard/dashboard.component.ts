import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';

/**
 * @description Dashboard component.
 */
@Component({
	selector: 'ldsly-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
	/**
	 * Creates an instance of dashboard component.
	 * @param _log
	 * @param _sb
	 */
	constructor(private _log: LogService) {}

	/**
	 * NgOnInit life cycle hook.
	 */
	ngOnInit(): void {
		this._log.trace('[DashboardComponent] Initialized.');
	}
}
