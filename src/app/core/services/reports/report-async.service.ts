import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_API_URL } from 'app/core/api-url-injection-token';
import { CampaignsReport } from 'app/core/models/reports/campaigns-report.model';
import { Observable } from 'rxjs';

/**
 * @description Report async service
 */
@Injectable({
	providedIn: 'root'
})
export class ReportsAsyncService {
	/**
	 * Creates an instance of general async service.
	 * @param _apiUrl
	 * @param _http
	 */
	constructor(@Inject(BACKEND_API_URL) private _apiUrl: string, private _http: HttpClient) {}

	/**
	 * @description Gets users campaigns effectiveness report
	 * @param userId
	 * @returns campaigns
	 */
	getGeneralReport$(): Observable<CampaignsReport> {
		return this._http.get<CampaignsReport>(`${this._apiUrl}/reports/general`);
	}
}
