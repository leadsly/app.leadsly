import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LinkedInAuthAttemptService } from '../custom-headers/linked-in-auth-attempt.service';

/**
 * @description Injectable
 */
@Injectable()
export class LinkedInAuthAttemptCountInterceptor implements HttpInterceptor {
	/**
	 * Creates an instance of linked in auth attempt count interceptor.
	 * @param authAttemptService
	 */
	constructor(private _authAttemptService: LinkedInAuthAttemptService) {}

	/**
	 * @description Intercepts responses and saves the auth attempt count.
	 * @param request
	 * @param next
	 * @returns intercept
	 */
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const isLinkedInAuthRequst = request.url.includes('linkedin-accounts') && this._authAttemptService.attemptCount;

		return next
			.handle(isLinkedInAuthRequst ? request.clone({ setHeaders: { 'X-Auth-Attempt-Count': this._authAttemptService.attemptCount } }) : request)
			.pipe(
				tap((event: HttpEvent<unknown>) => {
					if (event instanceof HttpResponse) {
						const attemptCount = event.headers.get('X-Auth-Attempt-Count');
						if (attemptCount) {
							this._authAttemptService.attemptCount = attemptCount;
						}
					}
				})
			);
	}
}
