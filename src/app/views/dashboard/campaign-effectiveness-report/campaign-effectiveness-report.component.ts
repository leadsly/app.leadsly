import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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
export class CampaignEffectivenessReportComponent implements OnInit {
	/**
	 * Chart options.
	 */
	@Input() set chartOptions(value: Partial<ChartOptionsApex>) {
		if (value) {
			this._chartOptions = this._mergeChartDataWithViewOptions(value);
		}
	}

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
	 * Merges chart data from server with view options
	 * @param options
	 * @returns chart data with view options
	 */
	private _mergeChartDataWithViewOptions(options: Partial<ChartOptionsApex>): Partial<ChartOptionsApex> {
		const opts: Partial<ChartOptionsApex> = {
			series: options.series.map((s) => {
				return {
					name: s.name,
					data: s.data
				};
			}),
			chart: {
				height: 350,
				type: 'area'
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: 'smooth'
			},
			xaxis: {
				type: options.xaxis.type,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				categories: options.xaxis.categories
			},
			tooltip: {
				x: {
					format: 'dd/MM/yy'
				}
			},
			legend: {
				position: 'top'
			}
		};
		return opts;
	}
}
