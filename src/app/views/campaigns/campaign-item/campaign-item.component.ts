import { BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/animations/route.animations';
import { LogService } from 'app/core/logger/log.service';
import { Campaign } from 'app/core/models/campaigns/campaign.model';
import { CloneCampaign } from 'app/core/models/campaigns/clone-campaign.model';
import { DeleteCampaign } from 'app/core/models/campaigns/delete-campaign.model';
import { ToggleCampaignStatus } from 'app/core/models/campaigns/toggle-campaign-status.model';
import {
	CAMPAIGN_DESCRIPTION_MOBILE_FONT,
	CAMPAIGN_ITEM_STAT_TITLE_FONT,
	CAMPAIGN_NAME_FONT,
	CAMPAIGN_NAME_MOBILE_FONT,
	CAMPAIGN_STAT_FONT_SIZE
} from '../LDSLY_CAMPAIGNS_GLOBAL_STYLES';

/**
 * Campaign item component.
 */
@Component({
	selector: 'ldsly-campaign-item',
	templateUrl: './campaign-item.component.html',
	styleUrls: ['./campaign-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignItemComponent implements OnInit, AfterViewInit {
	/**
	 * Route animations.
	 */
	readonly _routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

	/**
	 * Currently displaying campaign.
	 */
	@Input() set campaign(value: Campaign) {
		if (value) {
			this._initForms(value);
			this._campaign = value;
		}
	}

	/**
	 * Currently displaying campaign.
	 */
	_campaign: Campaign;

	/**
	 * Breakpoint state responds to screen size changes
	 */
	@Input() set breakpointState(value: BreakpointState) {
		if (value.matches) {
			this._verticalDivider = true;
		} else {
			this._verticalDivider = false;
		}
	}

	/**
	 * Emitted when campaign status changes from active to deactivated.
	 */
	@Output() toggleCampaign = new EventEmitter<ToggleCampaignStatus>();

	/**
	 * Emitted when request is made to delete campaign.
	 */
	@Output() deleteCampaign = new EventEmitter<DeleteCampaign>();

	/**
	 * Emitted when user updates campaign.
	 */
	@Output() updateCampaign = new EventEmitter<Campaign>();

	@Output() cloneCampaign = new EventEmitter<CloneCampaign>();

	/**
	 * Campaign's small grey font.
	 */
	readonly _campaignItemStatTitleFont = CAMPAIGN_ITEM_STAT_TITLE_FONT;

	/**
	 * Campaign's name font size.
	 */
	readonly _campaignNameFont = CAMPAIGN_NAME_FONT;

	/**
	 * Campaign's name mobile font size.
	 */
	readonly _campaignNameMobileFont = CAMPAIGN_NAME_MOBILE_FONT;

	/**
	 * Campaigns description mobile font size.
	 */
	readonly _campaignDescriptionMobileFont = CAMPAIGN_DESCRIPTION_MOBILE_FONT;

	/**
	 * Campaigns statistic font size.
	 */
	readonly _campaignStatFontSize = CAMPAIGN_STAT_FONT_SIZE;

	/**
	 * The direction of the mat divider.
	 */
	_verticalDivider = true;

	/**
	 * Whether notes mat-expansion panel is expanded or not.
	 */
	_viewNotes = false;

	/**
	 * Whether notes mobile mat-expansion is expanded or not.
	 */
	_viewNotesMobile = false;

	/**
	 * Name of material icon used to depict notes.
	 */
	_notesIcon = 'description';

	/**
	 * Name of material icon used to depict delete action.
	 */
	_removeCampaignIcon = 'remove_circle_outline';

	/**
	 * Name of material icon used to depict duplicate campaign icon.
	 */
	_cloneCampaignIcon = 'control_point_duplicate';

	/**
	 * Campaign item notes form.
	 */
	_campaignForm: FormGroup;

	/**
	 * Ensures expansion panel is collapsed on first animation load.
	 */
	_disableExpansionOnInitLoad = true;

	/**
	 * Creates an instance of campaign item component.
	 * @param _log
	 * @param _fb
	 */
	constructor(private _log: LogService, private _fb: FormBuilder) {}

	/**
	 * NgOnInit life cycle hook.
	 */
	ngOnInit(): void {
		this._log.trace(`[CampaignItem] Initialized for: ${this._campaign?.id}`);
	}

	ngAfterViewInit(): void {
		// we only care to disable this on initial load after that enable it
		this._disableExpansionOnInitLoad = false;
	}

	/**
	 * @description Initializes campaign form.
	 * @param campaign
	 * @returns form
	 */
	private _initForms(campaign: Campaign): void {
		this._campaignForm = this._initCampaignForm(campaign);
	}

	/**
	 * @description Initializes campaign form.
	 * @param campaign
	 * @returns campaign form
	 */
	private _initCampaignForm(campaign: Campaign): FormGroup {
		return this._fb.group({
			id: this._fb.control(campaign.id),
			active: this._fb.control(campaign.active),
			name: this._fb.control(campaign.name),
			connectionsSentDaily: this._fb.control(campaign.connectionsSentDaily),
			connectionsAccepted: this._fb.control(campaign.connectionsAccepted),
			totalConnectionsSent: this._fb.control(campaign.totalConnectionsSent),
			replies: this._fb.control(campaign.replies),
			profileViews: this._fb.control(campaign.profileViews),
			expired: this._fb.control(campaign.expired),
			notes: this._fb.control(campaign.notes)
		});
	}

	/**
	 * Toggles note's section from expanded to collapsed.
	 */
	_onToggleNotesSection(): void {
		this._viewNotes = !this._viewNotes;
	}

	/**
	 * Toggles note's section on mobile from exapnded to collapsed.
	 */
	_onToggleNotesSectionMobile(): void {
		this._viewNotesMobile = !this._viewNotesMobile;
	}

	/**
	 * Toggle for activating and deactivating user's campaign
	 */
	_onToggleCampaignClicked(event: MatSlideToggleChange): void {
		this._log.trace('[CampaignItemComponent] _onToggleCampaignClicked event handler fired.');
		const toggleCampaign: ToggleCampaignStatus = {
			id: this._campaign.id
		};
		this.toggleCampaign.emit(toggleCampaign);
	}

	_onCloneCampaignClicked(): void {
		this._log.trace('[CampaignItemComponent] _onCloneCampaignClicked event handler fired.');
		const cloneCampaign: CloneCampaign = {
			id: this._campaign.id
		};

		this.cloneCampaign.emit(cloneCampaign);
	}

	/**
	 * Event handler fired when user clicks to delete campaign.
	 */
	_onDeleteCampaignClicked(): void {
		this._log.trace('[CampaignItemComponent] _onDeleteCampaignClicked event handler fired.');
		const deleteCampaign: DeleteCampaign = {
			id: this._campaign.id
		};
		this.deleteCampaign.emit(deleteCampaign);
	}

	/**
	 * Event handler fired when user clicks to update campaign.
	 */
	_onUpdateCampaignClicked(): void {
		this._log.trace('[CampaignItemComponent] _onUpdateCampaignClicked event handler fired.');
		const updatedCampaign = this._campaignForm.value as Campaign;
		this._log.trace('campaign value is', updatedCampaign);
		this.updateCampaign.emit(updatedCampaign);
	}

	/**
	 * Event handler when user clicks cancel on notes.
	 */
	_onNotesClosedAutoSave(): void {
		this._viewNotes = false;
		this._viewNotesMobile = false;
		if (this._campaignForm.dirty && !this._campaignForm.pristine && this._campaignForm.touched) {
			this._log.debug('[CampaignItem] New notes detected. Updating campaign.');
			this._onUpdateCampaignClicked();
		}
	}
}
