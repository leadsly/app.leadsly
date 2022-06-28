import { ProblemDetails } from './../../../core/models/problem-details.model';
import { ProfileSandboxService } from './../profile-sandbox.service';

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { LdslyValidators } from 'app/core/form-validators/ldsly-validators';
import { LogService } from 'app/core/logger/log.service';
import { InternalServerErrorDetails } from 'app/core/models/internal-server-error-details.model';
import { LeadslyConnectResult } from 'app/core/models/profile/leadsly-connect-result.model';
import { LeadslySetupResult } from 'app/core/models/profile/leadsly-setup-result.model';
import { LinkAccount } from 'app/core/models/profile/link-account.model';
import { SetupVirtualAssistant } from 'app/core/models/profile/setup-virtual-assistant.model';
import { TimeZone } from 'app/core/models/time-zone.model';
import { filter, map, merge, Observable, Subscription, tap } from 'rxjs';

/**
 * @description Setup account component.
 */
@Component({
	selector: 'ldsly-setup-account',
	templateUrl: './setup-account.component.html',
	styleUrls: ['./setup-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupAccountComponent implements OnInit, OnDestroy {
	/**
	 * @description Setup form group.
	 */
	_setupForm: FormGroup;

	/**
	 * @description New assistant form.
	 */
	_newAssistantForm: FormGroup;

	/**
	 * @description Available time zones.
	 */
	_availableTimeZones$: Observable<TimeZone[]>;

	/**
	 * @description Orientation of setup account component
	 */
	_orientation: 'vertical' | 'horizontal' = 'vertical';

	/**
	 * @description Whether link account request is in progress.
	 */
	_linkAccountInProgress = false;

	/**
	 * @description Link account result.
	 */
	_linkAccountResult$: Observable<LeadslyConnectResult>;

	/**
	 * @description Indicator whether virtual assistant creation is in progress.
	 */
	_virtualAssistantCreationInProgress = false;

	/**
	 * @description Virtual assistant creation result$ of setup account component
	 */
	_virtualAssistantCreationResult$: Observable<LeadslySetupResult>;

	/**
	 * @description Reference to the mat stepper.
	 */
	@ViewChild(MatStepper) stepper: MatStepper;

	/**
	 * Emitted when server responds with 40X error.
	 */
	private _problemDetails$: Observable<ProblemDetails>;

	/**
	 * Emitted when server responds with 50X error.
	 */
	private _internalServerErrorDetails$: Observable<InternalServerErrorDetails>;

	/**
	 * @description Whether any server errors occured.
	 */
	_serverErrorOccured$: Observable<boolean>;

	/**
	 * @description Rxjs subscription.
	 */
	private readonly _subscription = new Subscription();

	/**
	 * Creates an instance of setup account component.
	 * @param _log
	 * * @param _fb
	 */
	constructor(private _route: ActivatedRoute, private _log: LogService, private _fb: FormBuilder, private _sb: ProfileSandboxService) {
		this._virtualAssistantCreationResult$ = this._sb.leadslySetupResult$;
		this._linkAccountResult$ = this._sb.leadslyConnectResult$;
		this._problemDetails$ = this._sb.problemDetails$;
		this._internalServerErrorDetails$ = this._sb.internalServerErrorDetails$;
	}

	/**
	 * @description NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('[SetupAccountComponent] Initialized.');
		this._availableTimeZones$ = this._sb.getSupportedTimeZones$();
		this._serverErrorOccured$ = this._hasServerErrorOccured$();
		this._virtualAssistantSetupCompleted();
		this._linkAccountSetupCompleted();
		this._initForms();
	}

	/**
	 * @description NgOnDestroy life cycle.
	 */
	ngOnDestroy(): void {
		this._log.trace('[SetupAccountComponent] Destroyed.');
		this._subscription.unsubscribe();
	}

	/**
	 * @description Listens for server errors.
	 */
	private _hasServerErrorOccured$(): Observable<boolean> {
		return merge(this._problemDetails$, this._internalServerErrorDetails$).pipe(map((err) => !!err));
	}

	private _linkAccountSetupCompleted(): void {
		this._subscription.add(
			this._linkAccountResult$
				.pipe(
					filter((result) => Object.keys(result).length !== 0),
					tap((_) => {
						this._linkAccountInProgress = false;
						this.stepper.next();
					})
				)
				.subscribe()
		);
	}

	/**
	 * @description Virtuals assistant setup completed
	 */
	private _virtualAssistantSetupCompleted(): void {
		this._subscription.add(
			this._virtualAssistantCreationResult$
				.pipe(
					filter((result) => Object.keys(result).length !== 0),
					tap((_) => {
						this._virtualAssistantCreationInProgress = false;
						this.stepper.next();
					})
				)
				.subscribe()
		);
	}

	/**
	 * @description Initializes forms.
	 */
	private _initForms(): void {
		this._setupForm = this._buildSetupForm();
		this._newAssistantForm = this._buildNewAssistantForm();
	}

	/**
	 * @description Builds setup form.
	 * @returns setup form
	 */
	private _buildSetupForm(): FormGroup {
		return this._fb.group({
			email: this._fb.control('', [LdslyValidators.required, LdslyValidators.email]),
			password: this._fb.control('', [LdslyValidators.required])
		});
	}

	/**
	 * @description Builds new assistant form.
	 * @returns new assistant form
	 */
	private _buildNewAssistantForm(): FormGroup {
		return this._fb.group({
			username: this._fb.control('', [LdslyValidators.required, LdslyValidators.email]),
			timezoneId: this._fb.control('', [LdslyValidators.required])
		});
	}

	/**
	 * @description When user submits the new assistant form.
	 */
	_onNewAssistantRequsted(event: SetupVirtualAssistant): void {
		this._log.info('[_onNewAssistantSubmitted] executed.');
		this._virtualAssistantCreationInProgress = true;
		this._sb.createVirtualAssistant(event);
	}

	/**
	 * @description Executed when user submits the link account form.
	 */
	_onLinkAccountRequested(event: LinkAccount): void {
		this._log.info('[_onLinkAccountSubmitted] executed.');
	}

	/**
	 * @description Executed when user completes setting up his account with leadsly.
	 */
	_onFinishClicked(): void {
		this._log.info('[_onFinishClicked] executed.');
		void this._sb.router.navigate(['campaigns'], { relativeTo: this._route.parent });
	}
}
