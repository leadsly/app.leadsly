import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { routeAnimations } from 'app/core/animations/route.animations';

@Component({
	selector: 'ldsly-campaigns-container',
	templateUrl: './campaigns-container.component.html',
	styleUrls: ['./campaigns-container.component.scss'],
	animations: [routeAnimations],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsContainerComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
