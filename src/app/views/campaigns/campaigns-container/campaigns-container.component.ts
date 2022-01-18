import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
@Component({
	selector: 'ldsly-campaigns-container',
	templateUrl: './campaigns-container.component.html',
	styleUrls: ['./campaigns-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsContainerComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
