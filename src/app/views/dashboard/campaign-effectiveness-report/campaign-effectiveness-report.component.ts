import { BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { LogService } from 'app/core/logger/log.service';
import { Campaign } from 'app/core/models/campaigns/campaign.model';
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
export class CampaignEffectivenessReportComponent implements OnInit {
	/**
	 * @description Currently selected campaign effectiveness report chart options.
	 */
	@Input() set selectedCampaignReportChartOptions(value: { chartOptionsApex: ChartOptionsApex }) {
		if (value) {
			this._selectedCampaignReportChartOptions = value.chartOptionsApex;
		}
	}

	/**
	 * @description Currently selected campaign effectiveness report chart options.
	 */
	_selectedCampaignReportChartOptions: ChartOptionsApex;

	/**
	 * @description Currently selected campaign id.
	 */
	@Input() set selectedCampaignId(value: string) {
		if (value) {
			this._selectedCampaignId = value;
		}
	}

	/**
	 * @description Currently selected campaign id.
	 */
	_selectedCampaignId: string;

	/**
	 * @description Users campaigns.
	 */
	@Input() set campaigns(value: Campaign[]) {
		if (value) {
			this._campaigns = value;
		}
	}

	/**
	 * @description Users campaigns.
	 */
	_campaigns: Campaign[];

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
	 * @description Emitted when current campaign selection has changed.
	 */
	@Output() campaignSelectionChanged = new EventEmitter<string>();

	/**
	 * Creates an instance of overall report component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('[CampaignEffectivenessReportComponent] Initialized.');
	}

	/**
	 * @description When user changes campaign selection event handler.
	 * @param event
	 */
	_onSelectionChange(event: MatSelectChange): void {
		this._log.trace('[CampaignEffectivenessReportComponent] _onSelectionChange fired.', this, event);
		this.campaignSelectionChanged.emit(event.value);
	}
}
