import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CampaignType } from 'app/core/models/campaigns/campaign-type';

@Component({
	selector: 'ldsly-create-campaign-details',
	templateUrl: './create-campaign-details.component.html',
	styleUrls: ['./create-campaign-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCampaignDetailsComponent implements OnInit {
	/**
	 * @description Campaign details form.
	 */
	@Input() set form(value: FormGroup) {
		if (value) {
			this._form = value;
		}
	}
	_form: FormGroup;

	/**
	 * @description Input  of create campaign details component
	 */
	@Input() set types(value: CampaignType[]) {
		if (value) {
			this._campaignTypes = value.map((x, i) => {
				x.id = (i + 1).toString();
				return x;
			});
		}
	}

	_campaignTypes: CampaignType[] = [];

	constructor() {}

	ngOnInit(): void {}
}
