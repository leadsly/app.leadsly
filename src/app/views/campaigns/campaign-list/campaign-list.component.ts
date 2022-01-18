import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LogService } from 'app/core/logger/log.service';
import { Campaign } from 'app/core/models/campaigns/campaign.model';
import { CloneCampaign } from 'app/core/models/campaigns/clone-campaign.model';
import { DeleteCampaign } from 'app/core/models/campaigns/delete-campaign.model';
import { MinScreenSizeQuery } from 'app/shared/screen-size-queries';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { CampaignsSandboxService } from '../campaigns-sandbox.service';
import { ToggleCampaignStatus } from './../../../core/models/campaigns/toggle-campaign-status.model';

/**
 * Campaigns list component.
 */
@Component({
	selector: 'ldsly-campaign-list',
	templateUrl: './campaign-list.component.html',
	styleUrls: ['./campaign-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignListComponent implements OnInit {
	/**
	 * Route animations.
	 */
	readonly _routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

	/**
	 * User's campaigns.
	 */
	_campaigns$: Observable<Campaign[]>;

	/**
	 * Whether specified screen width was matched.
	 */
	_breakpointStateScreenMatcher$: Observable<BreakpointState>;

	/**
	 * Creates an instance of campaign list component.
	 * @param _log
	 * @param _sb
	 * @param breakpointObserver
	 */
	constructor(private _log: LogService, private _sb: CampaignsSandboxService, breakpointObserver: BreakpointObserver) {
		this._campaigns$ = _sb.campaigns$;
		this._breakpointStateScreenMatcher$ = breakpointObserver.observe([MinScreenSizeQuery.md]);
	}

	/**
	 * NgOnInit life cycle
	 */
	ngOnInit(): void {
		this._log.trace('[CampaignListComponent] Initialized.', this);

		this._sb.getUserCampaigns();
	}

	/**
	 * Event handler when user toggles campaign from active to deactivated.
	 * @param event
	 */
	_onToggleCampaign(event: ToggleCampaignStatus): void {
		this._log.trace('[CampaignListComponent] _onToggleCampaign event handler fired.', this);
		this._sb.toggleCampaign(event);
	}

	/**
	 * Event handler when user deletes a campaign.
	 * @param event
	 */
	_onDeleteCampaign(event: DeleteCampaign): void {
		this._log.trace('[CampaignListComponent] _onDeleteCampaign event handler fired.', this);
		this._sb.deleteCampaign(event);
	}

	/**
	 * Event handler that clones campaign.
	 * @param event
	 * @param campaign
	 */
	_cloneCampaign(event: CloneCampaign, campaign: Campaign): void {
		this._log.trace('[CampaignListComponent] _cloneCampaign event handler fired.', this);
		const clonedCampaign: Campaign = {
			id: uuidv4(),
			active: false,
			connectionsAccepted: campaign.connectionsAccepted,
			connectionsSentDaily: campaign.connectionsSentDaily,
			name: campaign.name,
			notes: campaign.notes,
			profileViews: campaign.profileViews,
			replies: campaign.replies,
			expired: campaign?.expired,
			totalConnectionsSent: campaign.totalConnectionsSent
		};

		this._sb.cloneCampaign(event, clonedCampaign);
	}

	/**
	 * Event handler when user wants to updated campaign.
	 * @param event
	 */
	_onUpdateCampaign(event: Campaign): void {
		this._log.trace('[CampaignListComponent] _onUpdateCampaign event handler fired.', this);
		this._sb.updateCampaign(event);
	}
}
