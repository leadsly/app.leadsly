import { BreakpointState } from '@angular/cdk/layout/breakpoints-observer';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptionsApex } from 'app/core/models/reports/chart-options.apex.model';

/**
 * Campaigns effectiveness chart.
 */
@Component({
	selector: 'ldsly-campaign-effectiveness-report',
	templateUrl: './campaign-effectiveness-report.component.html',
	styleUrls: ['./campaign-effectiveness-report.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignEffectivenessReportComponent {
	/**
	 * @description Selected campaign effectiveness report.
	 */
	@Input() set selectedEffectivenessReport(value: { chartOptionsApex: ChartOptionsApex }) {
		if (value) {
			this._selectedEffectivenessReport = value.chartOptionsApex;
		}
	}

	/**
	 * @description Selected campaign effectiveness report.
	 */
	_selectedEffectivenessReport: ChartOptionsApex;

	/**
	 * @description Sets state matcher value if specific screen size is encountered.
	 */
	@Input() set breakpointStateScreenMatcher(value: BreakpointState) {
		const chartOptions: Partial<ChartOptionsApex> = {
			legend: {
				position: value.matches ? 'top' : 'bottom',
				horizontalAlign: value.matches ? 'left' : 'center'
			}
		};
		this.chartOptionsLegendUpdated.emit(chartOptions);
		this._breakpointStateScreenMatcher = value;
	}

	/**
	 * @description Sets state matcher value if specific screen size is encountered.
	 */
	private _breakpointStateScreenMatcher: BreakpointState;

	/**
	 * @description Emitted when chart options are updated.
	 */
	@Output() chartOptionsLegendUpdated = new EventEmitter<Partial<ChartOptionsApex>>();

	/**
	 * Creates an instance of overall report component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}
}
