import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from './../../../core/logger/log.service';

@Component({
	selector: 'ldsly-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent implements OnInit {
	@Input() campaignForm: FormGroup;
	@Output() notesUpdated = new EventEmitter<void>();
	@Output() notesClosedAutoSave = new EventEmitter<void>();

	_readonly = true;

	constructor(private _log: LogService) {}

	ngOnInit(): void {
		this._log.trace('[NotesComponent] Initialized.');
	}

	_onFormSubmitted(): void {
		this._readonly = true;
		this.notesClosedAutoSave.emit();
	}

	_onAddOrEditClicked(): void {
		this._readonly = false;
	}
}
