import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptions } from 'app/core/models/reports/chart-options.model';

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
			this._chartOptions = value;
		}
	}

	/**
	 * @description Chart options.
	 */
	_chartOptions: ChartOptions;

	/**
	 * Creates an instance of report container component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * NgOnInit life cycle hook.
	 */
	ngOnInit(): void {
		this._log.trace('[ReportContainerComponent] Initialized.');
	}
}
