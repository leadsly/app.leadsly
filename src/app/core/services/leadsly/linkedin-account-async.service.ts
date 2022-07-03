import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ConnectLinkedInAccountResult } from 'app/core/models/profile/connect-linked-in-account-result.model';
import { LinkAccount } from 'app/core/models/profile/link-account.model';
import { TwoFactorAuthResult } from 'app/core/models/profile/two-factor-auth-result.model';
import { TwoFactorAuth } from 'app/core/models/profile/two-factor-auth.model';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../../api-url-injection-token';
import { ConnectedInfo } from '../../models/connected-info.model';

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
	getInfo$(userId: string): Observable<ConnectedInfo> {
		return this._http.get<ConnectedInfo>(`${this._apiUrl}/linkedin-accounts/${userId}/info`, { headers: this._headers });
	}

	/**
	 * @description Connects user to LinkedIn.
	 * @param userId
	 * @param model
	 * @returns connect
	 */
	connect$(userId: string, model: LinkAccount): Observable<ConnectLinkedInAccountResult> {
		return this._http.post<ConnectLinkedInAccountResult>(`${this._apiUrl}/linkedin-accounts/${userId}/connect`, JSON.stringify(model), {
			headers: this._headers
		});
	}

	/**
	 * @description Enters two factor auth code.
	 * @param userId
	 * @param model
	 * @returns two factor auth$
	 */
	enterTwoFactorAuth$(userId: string, model: TwoFactorAuth): Observable<TwoFactorAuthResult> {
		return this._http.post<TwoFactorAuthResult>(`${this._apiUrl}/linkedin-accounts/${userId}/2fa`, JSON.stringify(model), {
			headers: this._headers
		});
	}
}
