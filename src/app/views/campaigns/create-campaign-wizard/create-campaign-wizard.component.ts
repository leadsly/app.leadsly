import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'ldsly-create-campaign-wizard',
	templateUrl: './create-campaign-wizard.component.html',
	styleUrls: ['./create-campaign-wizard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCampaignWizardComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
