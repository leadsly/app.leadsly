import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InternalServerError } from 'app/core/error-handler/internal-server-error.decorator';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { Observable } from 'rxjs';

/**
 * Spinner component.
 */
@Component({
	selector: 'ldsly-spinner',
	templateUrl: './ldsly-spinner.component.html',
	styleUrls: ['./ldsly-spinner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LdslySpinnerComponent {
	/**
	 * Stroke width of the progress spinner.
	 */
	@Input() strokeWidth: number;

	/**
	 * The diameter of the progress spinner (will set width and height of svg).
	 */
	@Input() diameter: number;

	/**
	 * Color of the spinner.
	 */
	@Input() spinnerColor: 'primary' | 'accent' | 'warn' = 'primary';

	/**
	 * Type of spinner. Controls the size.
	 */
	@Input() type: 'button' | 'default' = 'default';

	/**
	 * Emitted when server responds with 50X error.
	 */
	@InternalServerError() internalServerErrorDetails$: Observable<InternalServerErrorDetails>;
}
