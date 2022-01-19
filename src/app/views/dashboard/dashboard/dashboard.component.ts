import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import { LogService } from 'app/core/logger/log.service';
import { ChartOptions } from 'app/core/models/reports/chart-options.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DashboardSandboxService } from '../dashboard-sandbox.service';

@Component({
	selector: 'ldsly-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
	_overallReportOptions$: Observable<ChartOptions>;

	_chart: ApexCharts;

	constructor(private _log: LogService, private _sb: DashboardSandboxService) {
		this._overallReportOptions$ = _sb.overallReportOptions$;
	}

	ngOnInit(): void {
		this._log.trace('[DashboardComponent] Initialized.');

		this._sb.getUserOverallReport();

		this._overallReportOptions$.pipe(
			tap((overallReportSchema) => (this._chart = new ApexCharts(document.querySelector('#chart'), overallReportSchema)))
		);
	}
}
