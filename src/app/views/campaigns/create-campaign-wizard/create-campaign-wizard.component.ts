import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LdslyValidators } from 'app/core/form-validators/ldsly-validators';
import { LogService } from 'app/core/logger/log.service';
import { CampaignDetails } from 'app/core/models/campaigns/campaign-details';
import { CampaignMessage } from 'app/core/models/campaigns/campaign-message';
import { DelayUnit } from 'app/core/models/campaigns/delay-unit.model';
import { PrimaryProspectList } from 'app/core/models/campaigns/primary-prospect-list';
import { CampaignType } from '../../../core/models/campaigns/campaign-type';
import { NewCampaign } from './../../../core/models/campaigns/new-campaign';

@Component({
	selector: 'ldsly-create-campaign-wizard',
	templateUrl: './create-campaign-wizard.component.html',
	styleUrls: ['./create-campaign-wizard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCampaignWizardComponent implements OnInit {
	/**
	 * @description Determines whether the stepper should be linear or not
	 */
	_isLinear = true;

	/**
	 * @description Form for campaign details.
	 */
	_detailsForm: FormGroup;

	/**
	 * @description Form for messaging configuration.
	 */
	_messagingForm: FormGroup;

	/**
	 * @description Initial number of messages displayed.
	 */
	private _initialNumberOfMessages = 1;

	/**
	 * @description Delay units for automated messages.
	 */
	_delayUnits: DelayUnit[] = [
		{ unit: 'minutes', viewData: 'Minutes' },
		{ unit: 'hours', viewData: 'Hours' },
		{ unit: 'days', viewData: 'Days' }
	];

	/**
	 * @description Setter for triggering details form initialization.
	 */
	@Input() campaignTypes: CampaignType[] = [];

	/**
	 * @description Users existing prospect lists.
	 */
	@Input() prospectLists: PrimaryProspectList[] = [];

	/**
	 * @description Event emitter when new campaign is launched.
	 */
	@Output() launchCampaignClicked: EventEmitter<NewCampaign> = new EventEmitter<NewCampaign>();

	/**
	 * Creates an instance of create campaign wizard component.
	 * @param _fb
	 * @param _log
	 */
	constructor(private _fb: FormBuilder, private _log: LogService) {}

	/**
	 * @description NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._initForms();
	}

	/**
	 * @description Event handler when user wants to add new message.
	 */
	_onAddNewMessageClicked(): void {
		this._log.trace('[_onAddNewMessageClicked]: event handler executed.', this);
		const messages = this._messagingForm.get('messages')['controls'] as FormArray;
		messages.push(this._addMessageFormGroup());
	}

	/**
	 * @description Event handler when user wants to remove a message.
	 */
	_onDeleteMessageClicked(): void {
		this._log.error('NOT IMPLEMENTED');
	}

	/**
	 * @description Event handler for launching user campaign.
	 */
	_onLaunchCampaignClicked(): void {
		this._log.trace('[_onLaunchCampaignClicked] event handler executed');
		this._messagingForm.get('messages').updateValueAndValidity();
		this._detailsForm.get('primaryProspectList').get('searchUrls').updateValueAndValidity();
		const campaignDetails = this._detailsForm.value as CampaignDetails;
		const messagesForm = this._messagingForm.value as { messages: CampaignMessage[] };
		const messages = messagesForm.messages;
		const newCampaign: NewCampaign = {
			campaignDetails: campaignDetails,
			messages: messages
		};
		this.launchCampaignClicked.emit(newCampaign);
	}

	/**
	 * @description Event handler when user clicks to add new search url control
	 */
	_onSearchUrlControlAdded(): void {
		const formArray = this._detailsForm.get('primaryProspectList').get('searchUrls')['controls'] as FormArray;
		formArray.push(this._createSearchUrlControl());
	}

	/**
	 * @description Inits forms.
	 */
	private _initForms(): void {
		this._messagingForm = this._initializeMessagingForm();
		this._detailsForm = this._initializeDetailsForm();
	}

	/**
	 * @description Initializes messaging form.
	 * @returns messaging form
	 */
	private _initializeMessagingForm(): FormGroup {
		return this._fb.group({
			messages: this._fb.array(this._createMessagesGroup())
		});
	}

	/**
	 * @description Creates messages group.
	 * @returns messages group
	 */
	private _createMessagesGroup(): FormGroup[] {
		const messages: FormGroup[] = [];
		for (let index = 0; index < this._initialNumberOfMessages; index++) {
			const formGroup = this._addMessageFormGroup();
			messages.push(formGroup);
		}
		return messages;
	}

	/**
	 * @description Adds message form group
	 * @returns message form group
	 */
	private _addMessageFormGroup(): FormGroup {
		return this._fb.group({
			content: this._fb.control('', [LdslyValidators.required]),
			delay: this._fb.group({
				value: this._fb.control('', [LdslyValidators.required]),
				unit: this._fb.control('', [LdslyValidators.required])
			})
		});
	}

	/**
	 * @description Initializes details form.
	 * @param campaignTypes
	 * @returns details form
	 */
	private _initializeDetailsForm(): FormGroup {
		return this._fb.group({
			name: this._fb.control('', [LdslyValidators.required]),
			campaignType: this._fb.control('', [LdslyValidators.required]),
			primaryProspectList: this._createPrimaryProspectListFormGroup(),
			dailyInviteLimit: this._fb.control('', [LdslyValidators.required])
		});
	}

	/**
	 * @description Creates primary prospect list form group.
	 * @returns primary prospect list form group
	 */
	private _createPrimaryProspectListFormGroup(): FormGroup {
		return this._fb.group({
			name: this._fb.control('', [LdslyValidators.required]),
			existing: this._fb.control(false),
			searchUrls: this._fb.array([this._createSearchUrlControl()])
		});
	}

	/**
	 * @description Creates search url controls.
	 * @returns search url controls
	 */
	private _createSearchUrlControl(): FormControl {
		return this._fb.control('', [LdslyValidators.required]);
	}

	/**
	 * @description Creates campaign type controls.
	 * @param campaignTypes
	 * @returns campaign type controls
	 */
	private _createCampaignTypeControls(campaignTypes: CampaignType[]): FormControl[] {
		return campaignTypes.map((c) => this._fb.control(c.type, [LdslyValidators.required]));
	}
}
