import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { Observable } from 'rxjs';
import { DashboardSandboxService } from '../dashboard-sandbox.service';

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
	 * @description Campaigns effectiveness report ids.
	 */
	_campaignsIdsUsedForReport$: Observable<string[]>;

	/**
	 * Creates an instance of dashboard component.
	 * @param _log
	 * @param _sb
	 */
	constructor(private _log: LogService, private _sb: DashboardSandboxService) {
		this._campaignsIdsUsedForReport$ = _sb.campaignsIdsUsedForReport$;
	}

	/**
	 * NgOnInit life cycle hook.
	 */
	ngOnInit(): void {
		this._log.trace('[DashboardComponent] Initialized.');

		this._sb.getUserCampaignsEffectivenessReport();
	}
}
