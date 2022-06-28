import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CampaignType } from 'app/core/models/campaigns/campaign-type';
import { map, Observable, startWith } from 'rxjs';
import { LogService } from './../../../core/logger/log.service';
import { PrimaryProspectList } from './../../../core/models/campaigns/primary-prospect-list';

/**
 * @description Create campaign details component.
 */
@Component({
	selector: 'ldsly-create-campaign-details',
	templateUrl: './create-campaign-details.component.html',
	styleUrls: ['./create-campaign-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCampaignDetailsComponent {
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
			this._campaignTypes = value;
		}
	}

	_campaignTypes: CampaignType[] = [];

	/**
	 * @description User's prospect lists
	 */
	@Input() set prospectLists(value: PrimaryProspectList[]) {
		if (value) {
			this._prospectLists = value;
			this._setFilteredPrimaryProspectList();
		}
	}

	_prospectLists: PrimaryProspectList[] = [];

	/**
	 * @description Event emitter when user clicks to add new search url control.
	 */
	@Output() searchUrlControllAdded: EventEmitter<void> = new EventEmitter<void>();

	/**
	 * @description Filtered primary prospect lists for autocomplete.
	 */
	_filteredPrimaryProspectLists$: Observable<PrimaryProspectList[]>;

	/**
	 * Creates an instance of create campaign details component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * @description Event handler fired when user clicks to add new search url control
	 */
	_onAddSearchUrlClicked(): void {
		this._log.trace('[_onAddSearchUrlClicked]: User clicked to add new search url control');
		this.searchUrlControllAdded.emit();
	}

	/**
	 * @description Updates forms existing property based on if the value exists in prospect lists array
	 */
	_onSaveAndContinue(): void {
		this._log.trace('[_onSaveAndContinue]: User clicked to save and continue');
		const exists: boolean = this._prospectLists.some(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			(primaryProspectList) => primaryProspectList.name === this._form.get('primaryProspectList').get('name').value['name']
		);
		this._form.get('primaryProspectList').get('existing').setValue(exists);
	}

	/**
	 * @description Filters primary prospect list based on the passed in value
	 * @param name
	 * @returns filter
	 */
	private _filter(name: string): PrimaryProspectList[] {
		const filterValue = name.toLowerCase();
		return this._prospectLists.filter((primaryProspectList) => primaryProspectList.name.toLowerCase().includes(filterValue));
	}

	/**
	 * @description Sets filtered primary prospect list.
	 */
	private _setFilteredPrimaryProspectList(): void {
		this._filteredPrimaryProspectLists$ = this._form
			?.get('primaryProspectList')
			.get('name')
			.valueChanges.pipe(
				startWith(''),
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				map((value) => (typeof value === 'string' ? value : (value['name'] as string))),
				map((name) => (name ? this._filter(name) : this._prospectLists.slice()))
			);
	}

	/**
	 * @description Handles displaying of user's existing prospect lists
	 * @param prospectList
	 * @returns fn
	 */
	_displayFn(prospectList: PrimaryProspectList): string {
		return prospectList && prospectList.name ? prospectList.name : '';
	}
}
