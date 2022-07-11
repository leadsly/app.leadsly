import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/animations/route.animations';
import { CampaignType } from 'app/core/models/campaigns/campaign-type';
import { PrimaryProspectList } from 'app/core/models/campaigns/primary-prospect-list';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';

import { map, merge, Observable, Subscription, tap } from 'rxjs';
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
	 * @description Whether any server errors occured.
	 */
	_serverErrorOccured$: Observable<ProblemDetails | InternalServerErrorDetails>;

	/**
	 * @description New campaign created.
	 */
	_newCampaignCreated$: Observable<any>;

	/**
	 * Emitted when server responds with 40X error.
	 */
	private _problemDetails$: Observable<ProblemDetails>;

	/**
	 * Emitted when server responds with 50X error.
	 */
	private _internalServerErrorDetails$: Observable<InternalServerErrorDetails>;

	/**
	 * Route animations.
	 */
	readonly _routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

	/**
	 * @description Rxjs subscription.
	 */
	private readonly _subscription = new Subscription();

	/**
	 * Creates an instance of campaign wizard container component.
	 * @param _sb
	 * @param _log
	 */
	constructor(private _sb: CampaignsSandboxService, private _log: LogService, private _router: Router) {
		this._campaignTypes$ = _sb.campaignTypes$;
		this._prospectLists$ = _sb.prospectLists$;
		this._problemDetails$ = _sb.problemDetails$;
		this._newCampaignCreated$ = _sb.newCampaignCreated$;
		this._internalServerErrorDetails$ = _sb.internalServerErrorDetails$;
	}

	/**
	 * @description OnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('Initialized', this);
		this._serverErrorOccured$ = this._hasServerErrorOccured$();
		this._sb.getUsersProspectLists();
		this._onNewCampaignCreated();
	}

	/**
	 * @description OnDestroy life cycle.
	 */
	ngOnDestroy(): void {
		this._log.trace('Destroyed', this);
		this._subscription.unsubscribe();
	}

	/**
	 * @description Event handler when user creates new campaign.
	 * @param event
	 */
	_onLaunchNewCampaign(event: NewCampaign): void {
		this._log.trace('_onLaunchNewCampaign event handler fired', this);
		this._sb.launchNewCampaign(event);
	}

	/**
	 * @description Event handler when new campaign action is completed.
	 */
	private _onNewCampaignCreated(): void {
		this._subscription.add(
			this._newCampaignCreated$
				.pipe(
					tap(() => {
						this._log.debug('_onNewCampaignCreated', this);
						void this._router.navigate(['../campaigns']);
					})
				)
				.subscribe()
		);
	}

	/**
	 * @description Listens for server errors.
	 */
	private _hasServerErrorOccured$(): Observable<ProblemDetails | InternalServerErrorDetails> {
		return merge(this._problemDetails$, this._internalServerErrorDetails$).pipe(
			map((err) => {
				this._log.error('_hasServerErrorOccured', this, err);
				return err;
			})
		);
	}
}
