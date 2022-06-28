import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../api-url-injection-token';
import { OperationResponse } from '../models/operation-response.model';

/**
 * @description Gets users profile data
 */
@Injectable({
	providedIn: 'root'
})
export class ProfileAsyncService {
	private readonly _headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	/**
	 * Creates an instance of profile async service.
	 * @param _apiUrl
	 * @param _http
	 */
	constructor(@Inject(BACKEND_API_URL) private _apiUrl: string, private _http: HttpClient) {}

	/**
	 * @description Gets supported time zones.
	 * @returns supported time zones
	 */
	getSupportedTimeZones$(): Observable<OperationResponse> {
		return this._http.get<OperationResponse>(`${this._apiUrl}/timezones`, { headers: this._headers });
	}
}
