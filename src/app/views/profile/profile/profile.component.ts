import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @description User's profile component.
 */
@Component({
	selector: 'ldsly-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
	/**
	 * Creates an instance of profile component.
	 * @param _sb
	 */
	constructor() {}
}
