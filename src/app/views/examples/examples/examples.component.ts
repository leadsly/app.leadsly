import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { routeAnimations } from '../../../core/core.module';
import { ExamplesSandboxService } from '../examples-sandbox.service';

/**
 * Examples component.
 */
@Component({
	selector: 'ldsly-examples',
	templateUrl: './examples.component.html',
	styleUrls: ['./examples.component.scss'],
	animations: [routeAnimations],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
	isAuthenticated$: Observable<boolean>;

	readonly examples = [
		{ link: './', label: 'ldsly.examples.menu.todos' },
		{ link: './', label: 'ldsly.examples.menu.stocks' },
		{ link: './', label: 'ldsly.examples.menu.theming' },
		{ link: './', label: 'ldsly.examples.menu.crud' },
		{ link: './', label: 'ldsly.examples.menu.something' },
		{ link: './', label: 'ldsly.examples.menu.form' },
		{ link: './', label: 'ldsly.examples.menu.notifications' },
		{ link: './', label: 'ldsly.examples.menu.elements' },
		{ link: './', label: 'ldsly.examples.menu.auth', auth: true }
	];

	/**
	 * Creates an instance of examples component.
	 * @param _sb
	 */
	constructor(private _sb: ExamplesSandboxService) {
		this.isAuthenticated$ = this._sb.isAuthenticated$;
	}

	/**
	 * NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._sb.log.trace('Initialized.', this);
	}
}
