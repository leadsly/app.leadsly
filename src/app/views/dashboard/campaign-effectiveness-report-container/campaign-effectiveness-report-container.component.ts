import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { Campaign } from 'app/core/models/campaigns/campaign.model';
import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';
import { SelectedCampaign } from 'app/core/models/reports/selected-campaign.model';
import { MinScreenSizeQuery } from 'app/shared/screen-size-queries';
import { combineLatestWith, map, Observable, tap } from 'rxjs';
import { DashboardSandboxService } from '../dashboard-sandbox.service';
import { GetCampaign } from './../../../core/models/campaigns/get-campaign.model';

/**
 * @description Campaign effectiveness report containter component.
 */
@Component({
	selector: 'ldsly-campaign-effectiveness-report-container',
	templateUrl: './campaign-effectiveness-report-container.component.html',
	styleUrls: ['./campaign-effectiveness-report-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignEffectivenessReportContainerComponent implements OnInit, OnDestroy {
	/**
	 * @description Ids of the campaigns for which user is viewing a report for.
	 */
	@Input() set campaignsIdsUsedForReport(value: string[]) {
		if (value && value.length > 0) {
			this._campaignsIdsUsedForReport = value;
			const campaigns = this._campaignsIdsUsedForReport.map((c) => {
				return {
					campaignId: c
				} as GetCampaign;
			});
			this._log.debug('[CampaignEffectivenessReportContainerComponent] Getting users campaigns by ids.');
			this._sb.getCampaignsByIds({
				campaignIds: campaigns
			});
		}
	}

	/**
	 * @description campaigns effectiviness report ids.
	 */
	_campaignsIdsUsedForReport: string[];

	/**
	 * @description The default selected campaign report.
	 */
	_selectedCampaignId$: Observable<string>;

	/**
	 * @description Gets effectiveness report chart data by campaign id.
	 */
	private _getEffectivenessReportByCampaignId$: Observable<
		(id: string) => {
			chartOptionsApex: ChartOptionsApex;
		}
	>;

	/**
	 * Whether specified screen width was matched.
	 */
	_breakpointStateScreenMatcher$: Observable<BreakpointState>;

	/**
	 * @description User's campaigns.
	 */
	_campaigns$: Observable<Campaign[]>;

	/**
	 * @description Currently selected effectiveness report chart options.
	 */
	_selectedCampaignReportChartOptions$: Observable<{
		chartOptionsApex: ChartOptionsApex;
	}>;

	/**
	 * Creates an instance of report container component.
	 * @param _log
	 */
	constructor(private _log: LogService, breakpointObserver: BreakpointObserver, private _sb: DashboardSandboxService) {
		this._breakpointStateScreenMatcher$ = breakpointObserver.observe([MinScreenSizeQuery.md]);
		this._selectedCampaignId$ = _sb.selectedCampaignId$;
		this._getEffectivenessReportByCampaignId$ = _sb.getEffectivenessReportByCampaignId$;
		this._campaigns$ = _sb.campaigns$;
	}

	/**
	 * NgOnInit life cycle hook.
	 */
	ngOnInit(): void {
		this._log.trace('[ReportContainerComponent] Initialized.');

		this._selectedCampaignReportChartOptions$ = this._selectedCampaignId$.pipe(
			tap((_) => this._log.debug('[ReportContainerComponent] _selectedCampaignId changed. Fetching corresponding chart options.', this)),
			combineLatestWith(this._getEffectivenessReportByCampaignId$),
			map(([id, getById]) => getById(id))
		);
	}

	/**
	 * @description NgOnDestroy life cycle.
	 */
	ngOnDestroy(): void {
		this._log.trace('[ReportContainer] Destroyed.');
	}

	/**
	 * @description Event handler when chart options are updated.
	 * @param event
	 */
	_onChartOptionsUpdated(event: Partial<ChartOptionsApex>): void {
		this._sb.updateEffectivenessReportChartOptions(event);
	}

	/**
	 * @description Event handler fired when user picks different campaign from the selection box.
	 * @param event
	 */
	_onCampaignSelectionChange(event: string): void {
		this._log.trace('[CampaignEffectivenessReportContainerComponent] _onCampaignSelectionChange fired.', this, event);
		const selectedCampaign: SelectedCampaign = {
			id: event
		};
		this._sb.updateSelectedCampaignEffectivenessReport(selectedCampaign);
	}
}
