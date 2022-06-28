import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'ldsly-connected-account',
	templateUrl: './connected-account.component.html',
	styleUrls: ['./connected-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectedAccountComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
