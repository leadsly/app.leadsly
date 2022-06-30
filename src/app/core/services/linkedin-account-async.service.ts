import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../api-url-injection-token';
import { Connected } from '../models/connected.model';

/**
 * @description LinkedIn account async service.
 */
@Injectable({
	providedIn: 'root'
})
export class LinkedInAccountAsyncService {
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
	getIsConnected$(userId: string): Observable<Connected> {
		return this._http.get<Connected>(`${this._apiUrl}/linkedin-account/${userId}/is-connected`, { headers: this._headers });
	}
}
