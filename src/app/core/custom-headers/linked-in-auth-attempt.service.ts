import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LinkedInAuthAttemptService {
	/**
	 * @description Gets the auth attempt count.
	 */
	private _attemptCount: string;

	set attemptCount(count: string) {
		this._attemptCount = count;
	}

	get attemptCount(): string {
		return this._attemptCount;
	}
}
