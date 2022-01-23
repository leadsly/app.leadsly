import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';
import { MinScreenSizeQuery } from 'app/shared/screen-size-queries';
import { Observable } from 'rxjs';
import { combineLatestWith, map } from 'rxjs/operators';
import { DashboardSandboxService } from '../dashboard-sandbox.service';

/**
 * @description Report containter component.
 */
@Component({
	selector: 'ldsly-report-container',
	templateUrl: './report-container.component.html',
	styleUrls: ['./report-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportContainerComponent implements OnInit, OnDestroy {
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

	/**
	 * @description Campaigns effectiveness report ids of report container component
	 */
	_campaignsEffectivenessReportIds$: Observable<string[]>;

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
	}

	/**
	 * @description NgOnDestroy life cycle.
	 */
	ngOnDestroy(): void {
		this._log.trace('[ReportContainer] Destroyed.');
	}

	/**
	 * @description Event handler when chart options are updated.
	 * @param event
	 */
	_onChartOptionsUpdated(event: Partial<ChartOptionsApex>): void {
		this._sb.updateEffectivenessReportChartOptions(event);
	}
}
