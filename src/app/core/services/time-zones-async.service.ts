import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../api-url-injection-token';
import { TimeZone } from '../models/time-zone.model';

/**
 * @description Timezones async service.
 */
@Injectable({
	providedIn: 'root'
})
export class TimezonesAsyncService {
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
	 * @description Gets all supported timezones.
	 * @returns all supported$
	 */
	getAll$(): Observable<TimeZone[]> {
		return this._http.get<TimeZone[]>(`${this._apiUrl}/timezones`, { headers: this._headers });
	}
}
