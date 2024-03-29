import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TooltipTouchGestures } from '@angular/material/tooltip';
import { downUpFadeInAnimation } from 'app/core/core.module';
import { LogService } from 'app/core/logger/log.service';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { LDSLY_SMALL_SPINNER_DIAMETER, LDSLY_SMALL_SPINNER_STROKE_WIDTH } from 'app/shared/global-settings/mat-spinner-settings';
import { LDSLY_TOOLTIP_SHOW_DELAY_IN_MS } from 'app/shared/global-settings/mat-tooltip-settings';

/**
 * Two factor authentication codes component.
 */
@Component({
	selector: 'ldsly-two-factor-authentication-codes',
	templateUrl: './two-factor-authentication-codes.component.html',
	styleUrls: ['./two-factor-authentication-codes.component.scss'],
	animations: [downUpFadeInAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoFactorAuthenticationCodesComponent {
	/**
	 * Event emitter when server responds with 40X or 50X error.
	 */
	@Input() set serverError(value: ProblemDetails | InternalServerErrorDetails) {
		this._log.debug('serverError emitted.', this);
		this._serverError = value;
	}

	_serverError: ProblemDetails | InternalServerErrorDetails;

	/**
	 * Recovery codes user has left to redeem for logging in.
	 */
	@Input() set codes(value: string[]) {
		this._log.debug('codes emitted.', this);
		this._codes = value;
		// each time we successfully emit new codes null out serverError.
		this._removeServerError();
	}

	_codes: string[] = [];

	/**
	 * Whether there is an outgoing request to generate new recovery codes.
	 */
	@Input() generatingCodes = false;

	/**
	 * Whether the mat-expansien-panel should disallow user to expand it.
	 */
	@Input() disabled = false;

	/**
	 * Event emitter when user requests to generate new recovery codes.
	 */
	@Output() generateNewRecoveryCodesClicked = new EventEmitter<void>();

	/**
	 * Touch gestrues for mat tooltip.
	 */
	readonly _touchGestrues: TooltipTouchGestures = 'on';

	/**
	 * Delay in ms for toolip.
	 */
	readonly _showDelayInMs = LDSLY_TOOLTIP_SHOW_DELAY_IN_MS;

	/**
	 * Generating recovery codes spinner diameter.
	 */
	readonly _generatingCodesSpinnerDiameter = LDSLY_SMALL_SPINNER_DIAMETER;

	/**
	 * Generating recovery codes spinner stroke width.
	 */
	readonly _generatingCodesSpinnerStrokeWidth = LDSLY_SMALL_SPINNER_STROKE_WIDTH;

	/**
	 * Creates an instance of two factor authentication codes component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * Event handler when user requests to generate new recovery codes.
	 */
	_onGenerateNewRecoveryCodes(): void {
		this._log.trace('_onGenerateNewRecoveryCodes fired.', this);
		this.generateNewRecoveryCodesClicked.emit();
	}

	/**
	 * Event handler when user closes expansion panel.
	 */
	_onUserCodesClosed(): void {
		this._log.trace('_onUserCodesClosed fired.', this);
		this._removeServerError();
	}

	/**
	 * Sets serverError to null.
	 */
	private _removeServerError(): void {
		this._log.trace('_removeServerError fired.', this);
		this.serverError = null;
	}
}
