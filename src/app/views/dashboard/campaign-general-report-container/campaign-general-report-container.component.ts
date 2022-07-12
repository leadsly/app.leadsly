import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { Campaign } from 'app/core/models/campaigns/campaign.model';

import { ChartOptionsApex } from 'app/core/models/reports/apex-charts/chart-options.apex.model';
import { SelectedCampaign } from 'app/core/models/reports/selected-campaign.model';
import { MinScreenSizeQuery } from 'app/shared/screen-size-queries';
import { combineLatestWith, map, Observable, tap } from 'rxjs';
import { DashboardSandboxService } from '../dashboard-sandbox.service';

/**
 * @description Campaign effectiveness report containter component.
 */
@Component({
	selector: 'ldsly-campaign-general-report-container',
	templateUrl: './campaign-general-report-container.component.html',
	styleUrls: ['./campaign-general-report-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignGeneralReportContainerComponent implements OnInit, OnDestroy {
	/**
	 * @description Users campaigns.
	 */
	_campaigns$: Observable<Campaign[]>;

	/**
	 * @description The default selected campaign report this is set on the server.
	 */
	_selectedCampaignId$: Observable<string>;

	/**
	 * Whether specified screen width was matched.
	 */
	_breakpointStateScreenMatcher$: Observable<BreakpointState>;

	/**
	 * @description Currently selected effectiveness report chart options.
	 */
	_selectedCampaignReportChartOptions$: Observable<{
		chartOptionsApex: ChartOptionsApex;
	}>;

	/**
	 * @description Gets effectiveness report chart data by campaign id.
	 */
	private _selectGeneralReportByCampaignId$: Observable<
		(id: string) => {
			chartOptionsApex: ChartOptionsApex;
		}
	>;

	/**
	 * Creates an instance of report container component.
	 * @param _log
	 */
	constructor(private _log: LogService, breakpointObserver: BreakpointObserver, private _sb: DashboardSandboxService) {
		this._breakpointStateScreenMatcher$ = breakpointObserver.observe([MinScreenSizeQuery.md]);
		this._selectedCampaignId$ = _sb.selectedCampaignId$;
		this._selectGeneralReportByCampaignId$ = _sb.selectGeneralReportByCampaignId$;
		this._campaigns$ = _sb.campaigns$;
	}

	/**
	 * NgOnInit life cycle hook.
	 */
	ngOnInit(): void {
		this._log.trace('[ReportContainerComponent] Initialized.');
		this._sb.getGeneralReport();
		this._selectedCampaignReportChartOptions$ = this._setSelectedGeneralReportStream$();
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
		this._sb.updateSelectedGeneralReport(selectedCampaign);
	}

	/**
	 * @description Sets selected general report stream.
	 * @returns selected general report stream$
	 */
	private _setSelectedGeneralReportStream$(): Observable<{
		chartOptionsApex: ChartOptionsApex;
	}> {
		return this._selectedCampaignId$.pipe(
			tap((_) => this._log.debug('[ReportContainerComponent] _selectedCampaignId changed. Fetching corresponding chart options.', this, _)),
			combineLatestWith(this._selectGeneralReportByCampaignId$),
			map(([id, getById]) => getById(id))
		);
	}
}
