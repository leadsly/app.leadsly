import { BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';

/**
 * Campaigns effectiveness chart.
 */
@Component({
	selector: 'ldsly-campaign-general-report',
	templateUrl: './campaign-general-report.component.html',
	styleUrls: ['./campaign-general-report.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignGeneralReportComponent implements OnInit {
	/**
	 * @description Currently selected campaign effectiveness report chart options.
	 */
	@Input() set selectedCampaignReportChartOptions(value: { chartOptionsApex: ChartOptionsApex }) {
		this._log.debug('Chart options setter.', this, value);
		if (value) {
			this._selectedCampaignReportChartOptions = value.chartOptionsApex;
		}
	}

	/**
	 * @description Currently selected campaign effectiveness report chart options.
	 */
	_selectedCampaignReportChartOptions: ChartOptionsApex;

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
	 * @description Emitted when chart options are updated.
	 */
	@Output() chartOptionsUpdated = new EventEmitter<Partial<ChartOptionsApex>>();

	/**
	 * Creates an instance of overall report component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('Initialized.', this);
	}
}
