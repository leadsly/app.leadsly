import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CampaignType } from 'app/core/models/campaigns/campaign-type';
import { Observable } from 'rxjs';
import { CampaignsSandboxService } from '../campaigns-sandbox.service';
import { NewCampaign } from './../../../core/models/campaigns/new-campaign';

@Component({
	selector: 'ldsly-campaign-wizard-container',
	templateUrl: './campaign-wizard-container.component.html',
	styleUrls: ['./campaign-wizard-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignWizardContainerComponent implements OnInit {
	_campaignTypes$: Observable<CampaignType[]>;
	constructor(private _sb: CampaignsSandboxService) {
		this._campaignTypes$ = _sb.campaignTypes$;
	}

	ngOnInit(): void {}

	_onLaunchNewCampaign(event: NewCampaign): void {}
}
