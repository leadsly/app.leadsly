import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from './../../../core/logger/log.service';

/**
 * Campaigns notes component.
 */
@Component({
	selector: 'ldsly-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent implements OnInit {
	/**
	 * Campaign form.
	 */
	@Input() campaignForm: FormGroup;

	/**
	 * Height of notes textarea when notes section is expanded.
	 */
	@Input() textAreaHeight: string;

	/**
	 * Event emitter when notes are updated.
	 */
	@Output() notesUpdated = new EventEmitter<void>();

	/**
	 * Event emitter when notes are closed.
	 */
	@Output() notesClosedAutoSave = new EventEmitter<void>();

	/**
	 * Whether notes textarea is readonly.
	 */
	_readonly = true;

	/**
	 * Creates an instance of notes component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * NgOnInit component
	 */
	ngOnInit(): void {
		this._log.trace('[NotesComponent] Initialized.');
	}

	/**
	 * Event handler when form is submitted.
	 */
	_onFormSubmitted(): void {
		this._readonly = true;
		this.notesClosedAutoSave.emit();
	}

	/**
	 * Event handler when user wants to add/edit notes.
	 */
	_onAddOrEditClicked(): void {
		this._readonly = false;
	}
}
