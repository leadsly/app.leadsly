import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptions } from 'app/core/models/reports/chart-options.model';
import { MinScreenSizeQuery } from 'app/shared/screen-size-queries';
import _ from 'lodash.clonedeep';
import { Observable } from 'rxjs';

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
	 * @description Sets chart options.
	 */
	@Input() set chartOptions(value: ChartOptions) {
		if (value) {
			// cloning is necessary because apex charts adds properties to chart options.
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			const chartOptions = _(value) as ChartOptions;
			this._chartOptions = chartOptions;
		}
	}

	/**
	 * @description Chart options.
	 */
	_chartOptions: ChartOptions;

	/**
	 * Whether specified screen width was matched.
	 */
	_breakpointStateScreenMatcher$: Observable<BreakpointState>;

	@Output() chartOptionsLegendUpdated = new EventEmitter<Partial<ChartOptions>>();

	/**
	 * Creates an instance of report container component.
	 * @param _log
	 */
	constructor(private _log: LogService, breakpointObserver: BreakpointObserver) {
		this._breakpointStateScreenMatcher$ = breakpointObserver.observe([MinScreenSizeQuery.md]);
	}

	/**
	 * NgOnInit life cycle hook.
	 */
	ngOnInit(): void {
		this._log.trace('[ReportContainerComponent] Initialized.');
	}

	/**
	 * @description When legend chart options have changed.
	 * @param options
	 */
	_onChartOptionsLegendUpdated(options: Partial<ChartOptions>): void {
		this._log.trace('[ReportContainerComponent] _onChartOptionsUpdated fired.');
		this.chartOptionsLegendUpdated.emit(options);
	}
}
