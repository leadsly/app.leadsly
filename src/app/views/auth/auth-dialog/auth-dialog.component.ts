import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogService } from 'app/core/logger/log.service';
import { AuthDialogData } from 'app/core/models/auth/auth-dialog-data.model';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthDialogUserDecision } from '../../../core/models/auth/auth-dialog-user-decision.enum';

/**
 * Authentication dialog component that is displayed to the user when they are inactive or session has expired.
 */
@Component({
	selector: 'ldsly-auth-dialog',
	templateUrl: './auth-dialog.component.html',
	styleUrls: ['./auth-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthDialogComponent implements OnInit {
	/**
	 * Event emitter for when user requests to stay signed in.
	 */
	@Output() staySignedInClicked = new EventEmitter<AuthDialogUserDecision>();

	/**
	 * Event emitter for when user requests to sign out.
	 */
	@Output() signOutClicked = new EventEmitter<AuthDialogUserDecision>();

	/**
	 * Current time in seconds before session times out.
	 */
	_counter$: Observable<number>;

	/**
	 * Number of seconds left before session times out.
	 */
	_count: number;

	/**
	 * Display message of auth dialog component.
	 */
	_displayMessage: string;

	/**
	 * Gets left hand side logo url.
	 */
	readonly _logo = '../../../../assets/logo.png';

	/**
	 * Creates an instance of auth dialog component.
	 * @param _data
	 * @param _log
	 */
	constructor(@Inject(MAT_DIALOG_DATA) private _data: AuthDialogData, private _log: LogService) {
		_log.debug('Auth dialog dialogTimeout set to:', this, _data.dialogTimeout);
		this._count = _data.dialogTimeout;
		_log.debug('Auth dialog message set to:', this, _data.message);
		this._displayMessage = _data.message;
	}

	/**
	 * NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('Initialized', this);
		this._counter$ = timer(0, 1000).pipe(
			take(this._count),
			map(() => --this._count)
		);
	}

	/**
	 * Event handler for when user requests to stay signed in.
	 */
	_onStaySignedIn(): void {
		this._log.trace('_onStaySignedIn fired.', this);
		this.staySignedInClicked.emit(AuthDialogUserDecision.staySignedIn);
	}

	/**
	 * Event handler for when user reqests to be signed out.
	 */
	_onSignOut(): void {
		this._log.trace('_onSignOut fired.', this);
		this.signOutClicked.emit(AuthDialogUserDecision.signOut);
	}
}
