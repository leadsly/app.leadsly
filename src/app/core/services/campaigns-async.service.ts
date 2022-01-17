import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../api-url-injection-token';
import { CloneCampaign } from '../models/campaigns/clone-campaign.model';
import { ToggleCampaignStatus } from '../models/campaigns/toggle-campaign-status.model';
import { Campaign } from './../models/campaigns/campaign.model';
import { DeleteCampaign } from './../models/campaigns/delete-campaign.model';

@Injectable({
	providedIn: 'root'
})
export class CampaignsAsyncService {
	private readonly _headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	/**
	 * Creates an instance of campaigns async service.
	 * @param _apiUrl
	 * @param _http
	 */
	constructor(@Inject(BACKEND_API_URL) private _apiUrl: string, private _http: HttpClient) {}

	/**
	 * @description Update campaign.
	 * @param userId
	 * @returns campaigns
	 */
	updateCampaign$(campaign: Campaign): Observable<Campaign> {
		return this._http.put<Campaign>(`${this._apiUrl}/campaigns`, JSON.stringify(campaign), { headers: this._headers });
	}

	/**
	 * @description Deactivates campaign.
	 * @param userId
	 * @returns campaigns
	 */
	toggleActiveCampaign$(toggleCampaignStatus: ToggleCampaignStatus): Observable<Campaign> {
		return this._http.patch<Campaign>(`${this._apiUrl}/campaigns`, JSON.stringify(toggleCampaignStatus), { headers: this._headers });
	}

	cloneCampaign$(campaign: CloneCampaign): Observable<Campaign> {
		return this._http.post<Campaign>(`${this._apiUrl}/campaigns/${campaign.id}/clone`, JSON.stringify(campaign), { headers: this._headers });
	}

	/**
	 * @description Delete campaign.
	 * @param userId
	 * @returns campaigns
	 */
	deleteCampaign$(deleteCampaign: DeleteCampaign): Observable<void> {
		return this._http.delete<void>(`${this._apiUrl}/campaigns`, {
			body: JSON.stringify(deleteCampaign),
			headers: this._headers
		});
	}
}
