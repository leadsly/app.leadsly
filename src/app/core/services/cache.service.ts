import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Campaigns } from 'app/core/models/campaigns/campaigns.model';
import { CampaignsState } from 'app/views/campaigns/campaigns.store.state';
import { DashboardState } from 'app/views/dashboard/dashboard.store.state.ts';
import { forkJoin, map, Observable, of } from 'rxjs';
import { LogService } from '../logger/log.service';
import { Campaign } from '../models/campaigns/campaign.model';
import { GetCampaigns } from '../models/campaigns/get-campaigns-model';
import { CampaignsReport } from '../models/reports/campaigns-report.model';
import { GetCampaign } from './../models/campaigns/get-campaign.model';
import { CampaignsAsyncService } from './campaigns-async.service';
import { UsersAsyncService } from './users-async.service';

/**
 * @description Fetches fresh items or returns values from the store.
 */
@Injectable({
	providedIn: 'root'
})
export class CacheService {
	/**
	 * Creates an instance of cache service.
	 * @param _log
	 * @param _campaignAsyncService
	 * @param _store
	 * @param _userAsyncService
	 */
	constructor(
		private _log: LogService,
		private _campaignAsyncService: CampaignsAsyncService,
		private _store: Store,
		private _userAsyncService: UsersAsyncService
	) {}

	/**
	 * @description Gets campaign from cache or fetches from server.
	 * @param campaign
	 * @returns campaign by id$
	 */
	getCampaignById$(campaign: GetCampaign): Observable<Campaign> {
		const getCampaignById = this._store.selectSnapshot(CampaignsState.getCampaignById);
		const cachedCampaign = getCampaignById(campaign.campaignId);
		return cachedCampaign ? of(cachedCampaign) : this._campaignAsyncService.getCampaignById$(campaign);
	}

	/**
	 * @description Gets campaigns from cache or fetches from server.
	 * @param campaigns
	 * @returns campaign by ids$
	 */
	getCampaignByIds$(campaigns: GetCampaigns): Observable<Campaigns> {
		const campaignsRequests = campaigns.campaignIds.map((c) => this.getCampaignById$(c));
		return forkJoin(campaignsRequests).pipe(
			map((campaigns) => {
				return {
					items: campaigns
				} as Campaigns;
			})
		);
	}

	/**
	 * @description Gets campaigns effectiveness report data from cache or fetches from server.
	 * @param userId
	 * @returns campaigns effectiveness reports data$
	 */
	getCampaignsEffectivenessReportsData$(userId: string): Observable<CampaignsReport> {
		const chartData = this._store.selectSnapshot(DashboardState.getCampaignEffectivenessReportData);
		console.log(chartData);
		if (JSON.stringify(chartData) === '{}') {
			this._log.debug('[CacheService] getCampaignsEffectivenessReportsData item chart data not found in store. Fetching from server.');
			return this._userAsyncService.getCampaignsEffectivenessReportsData$(userId);
		}
		this._log.debug('[CacheService] getCampaignsEffectivenessReportsData item chart data found in store. Returning cached values.');
		const selectedCampaignId = this._store.selectSnapshot(DashboardState.getSelectedCampaignId);
		const campaignsReportCached: CampaignsReport = {
			items: Object.values(chartData),
			selectedCampaignId
		};
		return of(campaignsReportCached);
	}
}
