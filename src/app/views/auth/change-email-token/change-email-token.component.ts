import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LDSLY_BIG_SPINNER_DIAMETER, LDSLY_BIG_SPINNER_STROKE_WIDTH } from 'app/shared/global-settings/mat-spinner-settings';

/**
 * Change email token component. Responsible for letting user know if their email has been successfully updated.
 */
@Component({
	selector: 'ldsly-change-email-token',
	templateUrl: './change-email-token.component.html',
	styleUrls: ['./change-email-token.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeEmailTokenComponent {
	/**
	 * Whether there is an outgoing request to verify user's change email token and update the email.
	 */
	@Input() inProgress: boolean;

	/**
	 * Change email request spinner diameter.
	 */
	_changeEmailRequestSpinnerDiameter = LDSLY_BIG_SPINNER_DIAMETER;

	/**
	 * Change email request spinner stroke width.
	 */
	_changeEmailRequestSpinnerStrokeWidth = LDSLY_BIG_SPINNER_STROKE_WIDTH;
}
