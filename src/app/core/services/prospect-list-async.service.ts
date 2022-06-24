import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../api-url-injection-token';
import { OperationResponse } from '../models/operation-response.model';

/**
 * @description ProspectListAsync service.
 */
@Injectable({
	providedIn: 'root'
})
export class ProspectListAsyncService {
	/**
	 * Headers of users service.
	 */
	private readonly _headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	/**
	 * Creates an instance of prospect list async service.
	 * @param _apiUrl
	 * @param _http
	 */
	constructor(@Inject(BACKEND_API_URL) private _apiUrl: string, private _http: HttpClient) {}

	/**
	 * @description Gets users prospect lists.
	 * @param userId
	 * @returns users prospect lists$
	 */
	getUsersProspectLists$(userId: string): Observable<OperationResponse> {
		return this._http.get<OperationResponse>(`${this._apiUrl}/prospectlist/${userId}`);
	}
}
