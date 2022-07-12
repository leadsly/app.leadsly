import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Campaigns } from 'app/core/models/campaigns/campaigns.model';
import { UpdateOperation } from 'app/core/models/update-operation.model';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../../api-url-injection-token';
import { Campaign } from '../../models/campaigns/campaign.model';

import { NewCampaign } from '../../models/campaigns/new-campaign';

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
	 * @description Gets user's campaigns
	 * @param userId
	 * @returns campaigns
	 */
	getCampaigns$(userId: string): Observable<Campaigns> {
		return this._http.get<Campaigns>(`${this._apiUrl}/users/${userId}/campaigns`);
	}

	/**
	 * @description Update campaign.
	 * @param userId
	 * @returns campaigns
	 */
	update$(updateOperations: UpdateOperation[], userId: string, campaignId: string): Observable<Campaign> {
		return this._http.patch<Campaign>(`${this._apiUrl}/users/${userId}/campaigns/${campaignId}`, JSON.stringify(updateOperations), {
			headers: this._headers
		});
	}

	/**
	 * @description Clones campaign.
	 * @param campaign
	 * @returns new campaign.
	 */
	clone$(campaignId: string, userId: string): Observable<Campaign> {
		return this._http.post<Campaign>(`${this._apiUrl}/users/${userId}/campaigns/${campaignId}/clone`, JSON.stringify({}), { headers: this._headers });
	}

	/**
	 * @description Creates and launches the new campaign.
	 * @param campaign
	 * @returns campaign$
	 */
	create$(campaign: NewCampaign, userId: string): Observable<Campaign> {
		return this._http.post<Campaign>(`${this._apiUrl}/users/${userId}/campaigns`, JSON.stringify(campaign), { headers: this._headers });
	}

	/**
	 * @description Gets campaign by id.
	 * @param campaign
	 * @returns campaign by id
	 */
	getById$(campaignId: string, userId: string): Observable<Campaign> {
		return this._http.get<Campaign>(`${this._apiUrl}/users/${userId}/campaigns/${campaignId}`, {
			headers: this._headers
		});
	}

	/**
	 * @description Delete campaign.
	 * @param userId
	 * @returns campaigns
	 */
	delete$(campaignId: string, userId: string): Observable<void> {
		return this._http.delete<void>(`${this._apiUrl}/users/${userId}/campaigns/${campaignId}`, {
			headers: this._headers
		});
	}
}
