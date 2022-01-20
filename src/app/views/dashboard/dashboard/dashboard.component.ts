import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptions } from 'app/core/models/reports/chart-options.model';
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
	 * @description Campaigns effectiveness report.
	 */
	_campaignsEffectivenessReport$: Observable<Partial<ChartOptions>>;

	/**
	 * Creates an instance of dashboard component.
	 * @param _log
	 * @param _sb
	 */
	constructor(private _log: LogService, private _sb: DashboardSandboxService) {
		this._campaignsEffectivenessReport$ = _sb.campaignsEffectivenessReport$;
	}

	/**
	 * NgOnInit life cycle hook.
	 */
	ngOnInit(): void {
		this._log.trace('[DashboardComponent] Initialized.');

		this._sb.getUserOverallReport();
	}

	/**
	 * @description Updates effectiveness report options
	 * @param options
	 */
	_updateEffectivenessReportLegendOptions(options: Partial<ChartOptions>): void {
		this._log.trace('[DashboardComponent] _updateEffectivenessReportOptions fired.');
		this._sb.updateEffectivenessReportLegendOptions({
			legend: options.chartOptionsApex.legend
		});
	}
}
