import { BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';

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
	 * @description Sets BreakpointState.
	 */
	@Input() set breakpointState(value: BreakpointState) {
		const chartOptions: Partial<ChartOptionsApex> = {
			legend: {
				position: value.matches ? 'top' : 'bottom',
				horizontalAlign: value.matches ? 'left' : 'center'
			}
		};
		this.chartOptionsUpdated.emit(chartOptions);
		this._breakpointState = value;
	}

	/**
	 * @description Breakpoint state of campaign effectiveness report.
	 */
	_breakpointState: BreakpointState;

	/**
	 * @description Selected campaign effectiveness report.
	 */
	_selectedEffectivenessReport: ChartOptionsApex;

	/**
	 * @description Emitted when chart options are updated.
	 */
	@Output() chartOptionsUpdated = new EventEmitter<Partial<ChartOptionsApex>>();

	/**
	 * Creates an instance of overall report component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}
}
