import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/animations/route.animations';
import { CampaignType } from 'app/core/models/campaigns/campaign-type';
import { PrimaryProspectList } from 'app/core/models/campaigns/primary-prospect-list';
import { Observable } from 'rxjs';
import { CampaignsSandboxService } from '../campaigns-sandbox.service';
import { LogService } from './../../../core/logger/log.service';
import { NewCampaign } from './../../../core/models/campaigns/new-campaign';

/**
 * @description Campaign wizard container component.
 */
@Component({
	selector: 'ldsly-campaign-wizard-container',
	templateUrl: './campaign-wizard-container.component.html',
	styleUrls: ['./campaign-wizard-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignWizardContainerComponent implements OnInit, OnDestroy {
	/**
	 * @description The available campaign types.
	 */
	_campaignTypes$: Observable<CampaignType[]>;

	/**
	 * @description User's prospect lists.
	 */
	_prospectLists$: Observable<PrimaryProspectList[]>;

	/**
	 * Route animations.
	 */
	readonly _routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

	/**
	 * Creates an instance of campaign wizard container component.
	 * @param _sb
	 * @param _log
	 */
	constructor(private _sb: CampaignsSandboxService, private _log: LogService) {
		this._campaignTypes$ = _sb.campaignTypes$;
		this._prospectLists$ = _sb.prospectLists$;
	}

	/**
	 * @description OnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('Initialized', this);
		this._sb.getUsersProspectLists();
	}

	/**
	 * @description OnDestroy life cycle.
	 */
	ngOnDestroy(): void {
		this._log.trace('Destroyed', this);
	}

	/**
	 * @description Event handler when user creates new campaign.
	 * @param event
	 */
	_onLaunchNewCampaign(event: NewCampaign): void {
		this._log.trace('_onLaunchNewCampaign event handler fired', this);
		this._sb.launchNewCampaign(event);
	}
}
