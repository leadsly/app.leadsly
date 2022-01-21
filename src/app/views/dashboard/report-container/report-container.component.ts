import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptionsApex } from 'app/core/models/reports/chart-options.apex.model';
import { MinScreenSizeQuery } from 'app/shared/screen-size-queries';
import { Observable } from 'rxjs';
import { combineLatestWith, map } from 'rxjs/operators';
import { DashboardSandboxService } from '../dashboard-sandbox.service';

interface ReportNameView {
	id: string;
	name: string;
}

/**
 * @description Report containter component.
 */
@Component({
	selector: 'ldsly-report-container',
	templateUrl: './report-container.component.html',
	styleUrls: ['./report-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportContainerComponent implements OnInit {
	/**
	 * @description campaigns effectiviness report ids.
	 */
	@Input() set campaignsEffectivenessReportIds(value: string[]) {
		this._campaignsEffectivenessReportIds = value;
	}

	/**
	 * @description campaigns effectiviness report ids.
	 */
	_campaignsEffectivenessReportIds: string[];

	/**
	 * @description Campaigns effectiveness selected report id.
	 */
	_campaignsEffectivenessSelectedReportId$: Observable<string>;

	/**
	 * @description Get effectiveness report by id.
	 */
	_getEffectivenessReportById$: Observable<
		(id: string) => {
			chartOptionsApex: ChartOptionsApex;
		}
	>;

	/**
	 * @description Selected effectiveness report.
	 */
	_selectedEffectivenessReport$: Observable<{
		chartOptionsApex: ChartOptionsApex;
	}>;

	/**
	 * Whether specified screen width was matched.
	 */
	_breakpointStateScreenMatcher$: Observable<BreakpointState>;

	_campaignsEffectivenessReportIds$: Observable<string[]>;

	_reportValues$: Observable<ReportNameView>;

	/**
	 * Creates an instance of report container component.
	 * @param _log
	 */
	constructor(private _log: LogService, breakpointObserver: BreakpointObserver, private _sb: DashboardSandboxService) {
		this._breakpointStateScreenMatcher$ = breakpointObserver.observe([MinScreenSizeQuery.md]);
		this._campaignsEffectivenessSelectedReportId$ = _sb.campaignsEffectivenessSelectedReportId$;
		this._getEffectivenessReportById$ = _sb.getCampaignsEffectivenessReportById$;
		this._campaignsEffectivenessReportIds$ = _sb.campaignsEffectivenessReportIds$;
	}

	/**
	 * NgOnInit life cycle hook.
	 */
	ngOnInit(): void {
		this._log.trace('[ReportContainerComponent] Initialized.');

		this._selectedEffectivenessReport$ = this._campaignsEffectivenessSelectedReportId$.pipe(
			combineLatestWith(this._getEffectivenessReportById$),
			map(([id, getById]) => getById(id))
		);

		// this._reportValues$ = this._campaignsEffectivenessReportIds$.pipe(
		// 	combineLatestWith(this._getEffectivenessReportById$),
		// 	map(([ids, getById]) => ids.map(id => {
		// 		const chartOptions = getById(id);
		// 		return {
		// 			id: chartOptions.
		// 		} as ReportNameView;
		// 	}))
		// );
	}

	/**
	 * @description When legend chart options have changed.
	 * @param options
	 */
	_onChartOptionsLegendUpdated(options: Partial<ChartOptionsApex>): void {
		this._sb.updateEffectivenessReportChartOptions(options);
	}
}
