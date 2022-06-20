import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DelayUnit } from 'app/core/models/campaigns/delay-unit.model';
import { LogService } from './../../../core/logger/log.service';

@Component({
	selector: 'ldsly-create-campaign-messaging',
	templateUrl: './create-campaign-messaging.component.html',
	styleUrls: ['./create-campaign-messaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCampaignMessagingComponent implements OnInit {
	/**
	 * @description Input setter for this component's form.
	 */
	@Input() set form(value: FormGroup) {
		if (value) {
			this._form = value;
		}
	}

	_form: FormGroup;

	/**
	 * @description Sets the delay units.
	 */
	@Input() set delayUnits(value: DelayUnit[]) {
		if (value) {
			this._delayUnits = value;
		}
	}

	_delayUnits: DelayUnit[] = [];

	/**
	 * @description Event emitter when user wants to add new message.
	 */
	@Output() addNewMessageClicked: EventEmitter<void> = new EventEmitter<void>();

	constructor(private _log: LogService) {}

	ngOnInit(): void {}

	/**
	 * @description Event emitter when user wants to add new message
	 */
	_onAddNewMessageClicked(): void {
		this._log.trace('[_onAddNewMessageClicked] event handler executed.', this);
		this.addNewMessageClicked.emit();
	}
}
