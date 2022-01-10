import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from 'app/core/logger/log.service';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { LDSLY_SMALL_SPINNER_DIAMETER, LDSLY_SMALL_SPINNER_STROKE_WIDTH } from 'app/shared/global-settings/mat-spinner-settings';
import { TranslateValidationErrorsService } from 'app/shared/services/translate-validation-errors.service';
import { AuthBase } from 'app/views/auth/auth-base';

/**
 * Change email component.
 */
@Component({
	selector: 'ldsly-change-email',
	templateUrl: './change-email.component.html',
	styleUrls: ['./change-email.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeEmailComponent extends AuthBase {
	/**
	 * Emitted when server responds with 40X error.
	 */
	@Input() set problemDetails(value: ProblemDetails) {
		this.log.debug('Problem details emitted.', this);
		this.problemDetailsError = value;
	}

	/**
	 * Emitted when server responds with 50X error.
	 */
	@Input() set internalServerErrorDetails(value: InternalServerErrorDetails) {
		this.log.debug('Internal server error emitted.', this);
		this.internalServerError = value;
	}

	/**
	 * Change email form.
	 */
	@Input() changeEmailForm: FormGroup;

	/**
	 * Whether there currently is a request to change user's email.
	 */
	@Input() emailChangeInProgress: boolean;

	/**
	 * Emitted when user tries to change their email.
	 */
	@Output() changeEmailRequestSubmitted = new EventEmitter<void>();

	/**
	 * Emitted when user cancels out of change password view.
	 */
	@Output() cancelClicked = new EventEmitter<void>();

	/**
	 * Hide/show current password.
	 */
	_currentPasswordHide = true;

	/**
	 * Changing password spinner diameter.
	 */
	readonly _changingEmailSpinnerDiameter = LDSLY_SMALL_SPINNER_DIAMETER;

	/**
	 * Changing password spinner stroke width.
	 */
	readonly _changingEmailSpinnerStrokeWidth = LDSLY_SMALL_SPINNER_STROKE_WIDTH;

	/**
	 * Creates an instance of change email component.
	 * @param translateErrorValidationService
	 * @param log
	 * @param cd
	 */
	constructor(
		protected translateErrorValidationService: TranslateValidationErrorsService,
		protected log: LogService,
		protected cd: ChangeDetectorRef
	) {
		super(translateErrorValidationService, log, cd);
	}

	/**
	 * Event handler for when user changes the email.
	 */
	_onChangeEmail(): void {
		this.log.trace('_onChangePassword fired.', this);
		this.changeEmailRequestSubmitted.emit();
	}

	/**
	 * Event handler for when user cancels out of the change email view.
	 */
	_cancelClicked(): void {
		this.log.trace('_cancelClicked fired.', this);
		this.cancelClicked.emit();
	}
}
