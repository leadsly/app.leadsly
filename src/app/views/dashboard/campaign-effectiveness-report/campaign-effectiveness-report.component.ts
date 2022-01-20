import { BreakpointState } from '@angular/cdk/layout/breakpoints-observer';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptionsApex } from 'app/core/models/reports/chart-options.apex.model';
import { ChartOptions } from 'app/core/models/reports/chart-options.model';

/**
 * Campaigns effectiveness chart.
 */
@Component({
	selector: 'ldsly-campaign-effectiveness-report',
	templateUrl: './campaign-effectiveness-report.component.html',
	styleUrls: ['./campaign-effectiveness-report.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignEffectivenessReportComponent implements OnInit {
	/**
	 * Chart options.
	 */
	@Input() set chartOptions(value: Partial<ChartOptionsApex>) {
		if (value) {
			this._log.debug('[CampaignEffectivenessReportComponent] chartOptions are getting set.');
			this._chartOptions = value;
		}
	}

	/**
	 * @description Sets state matcher value if specific screen size is encountered.
	 */
	@Input() set breakpointStateScreenMatcher(value: BreakpointState) {
		this._updateChartOptions(value.matches);
	}

	/**
	 * @description Emitted when chart options are updated.
	 */
	@Output() chartOptionsLegendUpdated = new EventEmitter<Partial<ChartOptions>>();

	/**
	 * Chart options.
	 */
	_chartOptions: Partial<ChartOptionsApex>;

	/**
	 * Creates an instance of overall report component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('[CampaignEffectivenessReportComponent]: Initialized.');
	}

	/**
	 * @description Updates legend chart options.
	 * @param screenMatches
	 */
	private _updateChartOptions(screenMatches: boolean): void {
		if (screenMatches) {
			this._log.debug('[CampaignEffectivenessReportComponent] breakpointStateScreenMatcher value matched!');
			const updatedChartOptionsDesktop: ChartOptions = {
				chartOptionsApex: {
					legend: {
						position: 'bottom',
						horizontalAlign: 'center'
					}
				}
			};
			this.chartOptionsLegendUpdated.emit(updatedChartOptionsDesktop);
		} else {
			this._log.debug('[CampaignEffectivenessReportComponent] breakpointStateScreenMatcher value did NOT match');
			const updatedChartOptionsMobile: ChartOptions = {
				chartOptionsApex: {
					legend: {
						position: 'top',
						horizontalAlign: 'left'
					}
				}
			};
			this.chartOptionsLegendUpdated.emit(updatedChartOptionsMobile);
		}
	}
}
