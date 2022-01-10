import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
	LDSLY_SNACKBAR_DURATION_DEFAULT,
	LDSLY_SNACKBAR_DURATION_ERROR,
	LDSLY_SNACKBAR_DURATION_WARN
} from 'app/shared/global-settings/mat-snackbar-settings';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Notification service that displays toast notification.
 */
@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	/**
	 * Default duration of notification service.
	 */
	private readonly _defaultDuration = LDSLY_SNACKBAR_DURATION_DEFAULT;

	/**
	 * Warn duration of notification service.
	 */
	private readonly _warnDuration = LDSLY_SNACKBAR_DURATION_WARN;

	/**
	 * Error duration of notification service.
	 */
	private readonly _errorDuration = LDSLY_SNACKBAR_DURATION_ERROR;

	/**
	 * Creates an instance of notification service.
	 * @param snackBar
	 * @param zone
	 */
	constructor(private readonly _snackBar: MatSnackBar, private readonly _zone: NgZone, private _translationService: TranslateService) {}

	/**
	 * Defaults notification.
	 * @param message
	 */
	default(message: string): void {
		this._show(message, {
			duration: this._defaultDuration,
			panelClass: 'default-notification-overlay'
		});
	}

	/**
	 * Info notification.
	 * @param message
	 */
	info(message: string): void {
		this._show(message, {
			duration: this._defaultDuration,
			panelClass: 'info-notification-overlay'
		});
	}

	/**
	 * Info notification with 'Dismiss' button.
	 * @param message
	 */
	infoWithBtn(message: string): void {
		this._showWithBtn(message, {
			panelClass: 'info-notification-overlay-with-btn'
		});
	}

	/**
	 * Info notification with 'Dismiss' button and translated message.
	 * @param message
	 */
	infoWithBtn$(message: string): Observable<any> {
		return this._translationService.get(message).pipe(
			tap((message: string) => {
				this.infoWithBtn(message);
			})
		);
	}

	/**
	 * Success notification.
	 * @param message
	 */
	success(message: string): void {
		this._show(message, {
			duration: this._defaultDuration,
			panelClass: 'success-notification-overlay'
		});
	}

	/**
	 * Warns notification.
	 * @param message
	 */
	warn(message: string): void {
		this._show(message, {
			duration: this._warnDuration,
			panelClass: 'warning-notification-overlay'
		});
	}

	/**
	 * Errors notification.
	 * @param message
	 */
	error(message: string): void {
		this._show(message, {
			duration: this._errorDuration,
			panelClass: 'error-notification-overlay'
		});
	}

	/**
	 * Error notification with 'Dismiss' button.
	 * @param message
	 */
	errorWithBtn(message: string): void {
		this._showWithBtn(message, {
			panelClass: 'error-notification-overlay-with-btn'
		});
	}

	/**
	 * Errors notification with 'Dismiss' button and translated message.
	 * @param message
	 * @returns with btn$
	 */
	errorWithBtn$(message: string): Observable<any> {
		return this._translationService.get(message).pipe(
			tap((message: string) => {
				this.errorWithBtn(message);
			})
		);
	}

	/**
	 * Displays the notification.
	 * @param message
	 * @param configuration
	 */
	private _show(message: string, configuration: MatSnackBarConfig): void {
		// Need to open snackBar from Angular zone to prevent issues with its position per
		// https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
		this._zone.run(() => this._snackBar.open(message, null, configuration));
	}

	/**
	 * Displays the notification with 'Dismiss' button.
	 * @param message
	 * @param configuration
	 */
	private _showWithBtn(message: string, configuration: MatSnackBarConfig): void {
		// Need to open snackBar from Angular zone to prevent issues with its position per
		// https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
		this._zone.run(() => this._snackBar.open(message, 'Dismiss', configuration));
	}
}
