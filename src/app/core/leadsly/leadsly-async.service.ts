import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../api-url-injection-token';
import { OperationResponse } from './../models/operation-response.model';

/**
 * @description Leadsly auth service.
 */
@Injectable({
	providedIn: 'root'
})
export class LeadslyAsyncService {
	private readonly _headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	/**
	 * Creates an instance of leadsly async service.
	 * @param _apiUrl
	 * @param _http
	 */
	constructor(@Inject(BACKEND_API_URL) private _apiUrl: string, private _http: HttpClient) {}

	/**
	 * @description Gets connected account information.
	 * @returns connected account$
	 */
	getConnectedAccount$(): Observable<OperationResponse> {
		return this._http.get<OperationResponse>(`${this._apiUrl}/leadsly/connected-account`, { headers: this._headers });
	}
}
