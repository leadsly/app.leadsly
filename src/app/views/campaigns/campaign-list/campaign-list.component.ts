import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'app/core/logger/log.service';
import { Campaign } from 'app/core/models/campaigns/campaign.model';
import { CloneCampaign } from 'app/core/models/campaigns/clone-campaign.model';
import { DeleteCampaign } from 'app/core/models/campaigns/delete-campaign.model';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { ProblemDetails } from 'app/core/models/problem-details.model';
import { MinScreenSizeQuery } from 'app/shared/screen-size-queries';
import { map, merge, Observable, Subscription, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CampaignsSandboxService } from '../campaigns-sandbox.service';
import { ToggleCampaignStatus } from './../../../core/models/campaigns/toggle-campaign-status.model';

/**
 * Campaigns list component.
 */
@Component({
	selector: 'ldsly-campaign-list',
	templateUrl: './campaign-list.component.html',
	styleUrls: ['./campaign-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class CampaignListComponent implements OnInit, OnDestroy {
	/**
	 * User's campaigns.
	 */
	_campaigns$: Observable<Campaign[]>;

	/**
	 * Whether specified screen width was matched.
	 */
	_breakpointStateScreenMatcher$: Observable<BreakpointState>;

	/**
	 * Whether there is an outgoing request to fetch campaigns.
	 */
	_loading = false;

	/**
	 * @description Error stream.
	 */
	error$: Observable<InternalServerErrorDetails | ProblemDetails>;

	/**
	 * @description Rxjs subscription.
	 */
	private readonly _subscription = new Subscription();

	/**
	 * Creates an instance of campaign list component.
	 * @param _log
	 * @param _sb
	 * @param _route
	 * @param _cd
	 * @param breakpointObserver
	 */
	constructor(
		private _route: ActivatedRoute,
		private _log: LogService,
		private _sb: CampaignsSandboxService,
		private _cd: ChangeDetectorRef,
		breakpointObserver: BreakpointObserver
	) {
		this._breakpointStateScreenMatcher$ = breakpointObserver.observe([MinScreenSizeQuery.md]);
	}

	/**
	 * NgOnInit life cycle
	 */
	ngOnInit(): void {
		this._log.trace('[CampaignListComponent] Initialized.', this);
		this.error$ = this._setErrorStream$();
		this._listenForServerErrors();
		this._campaigns$ = this._getUserCampaigns$();
	}

	/**
	 * @description NgOnDestroy life cycle.
	 */
	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}

	/**
	 * @description Create campaign event handler.
	 */
	_onCreateCampaignClicked(): void {
		void this._sb.router.navigate(['create'], { relativeTo: this._route.parent });
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

	/**
	 * @description Gets user campaigns.
	 * @returns user campaigns$
	 */
	private _getUserCampaigns$(): Observable<Campaign[]> {
		this._loading = true;
		return merge(this._sb.campaigns$, this._sb.getUserCampaigns$().pipe(tap((_) => (this._loading = false))));
	}

	/**
	 * @description Listens for server errors.
	 */
	private _listenForServerErrors(): void {
		this._subscription.add(
			this.error$
				.pipe(
					tap((val) => {
						this._log.error('Server error occured', this, this._loading);
						this._loading = !val;
						this._cd.detectChanges();
					})
				)
				.subscribe()
		);
	}

	/**
	 * @description Sets error streamm.
	 * @returns error stream$
	 */
	private _setErrorStream$(): Observable<ProblemDetails | InternalServerErrorDetails> {
		return merge(this._sb.problemDetails$, this._sb.internalServerErrorDetails$).pipe(
			map((err) => {
				this._log.error('Error occured', this, err);
				return err;
			})
		);
	}
}
