import { BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Campaign } from 'app/core/models/campaigns/campaign.model';
import { LogService } from './../../../core/logger/log.service';

/**
 * @description Campaign report filter component.
 */
@Component({
	selector: 'ldsly-campaign-report-filters',
	templateUrl: './campaign-report-filters.component.html',
	styleUrls: ['./campaign-report-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignReportFiltersComponent implements OnInit {
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
		this._breakpointState = value;
	}

	/**
	 * @description Breakpoint state of campaign effectiveness report.
	 */
	_breakpointState: BreakpointState;

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
	 * @description Emitted when current campaign selection has changed.
	 */
	@Output() campaignSelectionChanged = new EventEmitter<string>();

	/**
	 * Creates an instance of campaign report filters component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('[CampaignReportFiltersComponent] Initialized.');
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
