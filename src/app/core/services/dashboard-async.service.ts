import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../api-url-injection-token';

@Injectable({
	providedIn: 'root'
})
export class DashboardAsyncService {
	private readonly _headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	constructor(@Inject(BACKEND_API_URL) private _apiUrl: string, private _http: HttpClient) {}
}
