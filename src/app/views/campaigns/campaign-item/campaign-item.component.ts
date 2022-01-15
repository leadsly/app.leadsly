import { BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { Campaign } from 'app/core/models/campaigns/campaign.model';
import { DeleteCampaign } from 'app/core/models/campaigns/delete-campaign.model';
import { ToggleCampaignStatus } from 'app/core/models/campaigns/toggle-campaign-status.model';
import { CAMPAIGN_SMALL_GREY_FONT } from '../LDSLY_CAMPAIGNS_GLOBAL_STYLES';

@Component({
	selector: 'ldsly-campaign-item',
	templateUrl: './campaign-item.component.html',
	styleUrls: ['./campaign-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignItemComponent implements OnInit {
	_verticalDivider = true;

	readonly _campaignSmallGreyFont = CAMPAIGN_SMALL_GREY_FONT;

	@Input() campaign: Campaign;
	@Input() set breakpointState(value: BreakpointState) {
		if (value.matches) {
			this._verticalDivider = true;
		} else {
			this._verticalDivider = false;
		}
	}

	@Output() toggleCampaign = new EventEmitter<ToggleCampaignStatus>();
	@Output() deleteCampaign = new EventEmitter<DeleteCampaign>();
	@Output() updateCampaign = new EventEmitter<Campaign>();

	constructor(private _log: LogService) {}

	ngOnInit(): void {}

	_onToggleCampaignClicked(): void {
		this._log.trace('[CampaignItemComponent] _onToggleCampaignClicked event handler fired.');
		const toggleCampaign: ToggleCampaignStatus = {
			id: this.campaign.id
		};
		this.toggleCampaign.emit(toggleCampaign);
	}

	_onDeleteCampaignClicked(): void {
		this._log.trace('[CampaignItemComponent] _onDeleteCampaignClicked event handler fired.');
		const deleteCampaign: DeleteCampaign = {
			id: this.campaign.id
		};
		this.deleteCampaign.emit(deleteCampaign);
	}

	_onUpdateCampaignClicked(): void {
		this._log.error('[onUpdateCampaignClicked] _onUpdateCampaignClicked event handler fired.');
	}
}
