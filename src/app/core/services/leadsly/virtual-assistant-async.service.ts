import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DeleteVirtualAssistantResult } from 'app/core/models/profile/delete-virtual-assistant-result.model';
import { VirtualAssistantInfo } from 'app/core/models/profile/virtual-assistant-info.model';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../../api-url-injection-token';
import { SetupVirtualAssistant } from '../../models/profile/setup-virtual-assistant.model';
import { VirtualAssistant } from '../../models/profile/virtual-assistant.model';

/**
 * @description Virtual assistant async service.
 */
@Injectable({
	providedIn: 'root'
})
export class VirtualAssistantAsyncService {
	private readonly _headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	/**
	 * Creates an instance of virtual assistant async service.
	 * @param _apiUrl
	 * @param _http
	 */
	constructor(@Inject(BACKEND_API_URL) private _apiUrl: string, private _http: HttpClient) {}

	/**
	 * @description Creates virtual assistant.
	 * @param model
	 * @returns virtual assistant$
	 */
	/**
	 * @description Creates virtual assistant.
	 * @param model
	 * @returns virtual assistant$
	 */
	create$(model: SetupVirtualAssistant): Observable<VirtualAssistant> {
		return this._http.post<VirtualAssistant>(`${this._apiUrl}/virtual-assistant`, JSON.stringify(model), {
			headers: this._headers
		});
	}

	/**
	 * @description Delete$s virtual assistant async service
	 * @returns delete$
	 */
	delete$(virtualAssistantId: string): Observable<DeleteVirtualAssistantResult> {
		const options = {
			headers: this._headers,
			body: JSON.stringify(virtualAssistantId)
		};
		return this._http.delete<DeleteVirtualAssistantResult>(`${this._apiUrl}/virtual-assistant`, options);
	}

	/**
	 * @description Gets user's virtual assistant
	 * @returns get$
	 */
	getInfo$(): Observable<VirtualAssistantInfo> {
		return this._http.get<VirtualAssistantInfo>(`${this._apiUrl}/virtual-assistant`, {
			headers: this._headers
		});
	}
}
