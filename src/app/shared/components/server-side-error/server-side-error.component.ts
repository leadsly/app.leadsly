import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { upDownFadeInAnimation } from 'app/core/core.module';
import { LogService } from 'app/core/logger/log.service';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { LDSLY_GLOBAL_ERROR_FONT_SIZE } from 'app/shared/global-settings/global-settings';
import { Observable, of } from 'rxjs';

/**
 * Server side error component that handles displaying server side errors.
 */
@Component({
	selector: 'ldsly-server-side-error',
	templateUrl: './server-side-error.component.html',
	styleUrls: ['./server-side-error.component.scss'],
	animations: [upDownFadeInAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerSideErrorComponent implements OnInit {
	/**
	 * Server side error.
	 */
	@Input() serverError: ProblemDetails | InternalServerErrorDetails;

	/**
	 * Sets problem detials.
	 */
	@Input() set problemDetails(value: ProblemDetails) {
		this._log.debug('problemDetails emitted.', this);
		this._problemDetails = value;
	}

	_problemDetails: ProblemDetails;

	/**
	 * Sets internal server error details.
	 */
	@Input() set internalServerErrorDetails(value: InternalServerErrorDetails) {
		this._log.debug('internalServerErrorDetails emitted.', this);
		this._internalServerErrorDetails = value;
	}

	_internalServerErrorDetails: InternalServerErrorDetails;

	/**
	 * Error font size for server errors.
	 */
	readonly _errorFontSize = LDSLY_GLOBAL_ERROR_FONT_SIZE;

	/**
	 * Creates an instance of ldsly server side error component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('Initialized', this);
	}

	/**
	 * Gets error message.
	 * @param serverError
	 * @returns error message
	 */
	_getErrorMessage$(): Observable<string> {
		if ((this.serverError as InternalServerErrorDetails)?.message) {
			return of((this.serverError as InternalServerErrorDetails).message);
		} else if (this.serverError) {
			return of(this.serverError.detail);
		}
	}
}
