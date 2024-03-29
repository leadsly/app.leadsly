import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TooltipTouchGestures } from '@angular/material/tooltip';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { downUpFadeInAnimation } from 'app/core/core.module';
import { LogService } from 'app/core/logger/log.service';
import { PasswordHelp } from 'app/core/models/auth/password-help.model';
import { PasswordRequirementType } from 'app/core/models/auth/password-requirement-type.enum';
import { PasswordRequirement } from 'app/core/models/auth/password-requirement.model';
import { PasswordResetMatTreeState } from 'app/core/models/password-reset-mat-tree-state.model';
import { LDSLY_TOOLTIP_SHOW_DELAY_IN_MS } from 'app/shared/global-settings/mat-tooltip-settings';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Displays password help and validates users password.
 */
@Component({
	selector: 'ldsly-password-help',
	templateUrl: './password-help.component.html',
	styleUrls: ['./password-help.component.scss'],
	// has to be default because nothing changes in the template when requirements go from passed to failed.
	changeDetection: ChangeDetectionStrategy.Default,
	animations: [downUpFadeInAnimation]
})
export class PasswordHelpComponent implements OnInit, OnDestroy {
	/**
	 * Password control.
	 */
	@Input() set passwordControl(value: AbstractControl) {
		this._log.debug('passwordControl fired.', this);
		this._passwordControl = value;
		this._subscription.add(this._validateFormPasswordField$(this._passwordControl).subscribe());
	}

	/**
	 * Password control.
	 */
	_passwordControl: AbstractControl;

	/**
	 * Sets up datasource with password requirements.
	 */
	@Input() set passwordRequirements(value: PasswordRequirement[]) {
		this._log.debug('passwordRequirements fired.', this);
		this._dataSource.data = value;
	}

	/**
	 * Toggles password help control.
	 */
	@Input() set togglePosition(value: PasswordResetMatTreeState) {
		// TODO does not work in change password view. When its expanded it does not collapse
		if (this.matTree) {
			this._setMatTreeStateAndNotifyParent(value);
		}
	}

	/**
	 * View child of password help component
	 */
	@ViewChild('tree') matTree: MatTree<PasswordRequirement>;

	/**
	 * Event emitter when password help is clicked.
	 */
	@Output() passwordHelpClicked = new EventEmitter<void>();

	/**
	 * Touch gestrues for mat tooltip.
	 */
	readonly _touchGestrues: TooltipTouchGestures = 'on';

	/**
	 * Delay in ms for toolip.
	 */
	readonly _showDelayInMs = LDSLY_TOOLTIP_SHOW_DELAY_IN_MS;

	/**
	 * Indent of mat-tree-node component.
	 */
	_indent = 0;

	/**
	 * Password length requirement for password control.
	 * Used to inform user about password requirement.
	 */
	_passwordLengthReqMet = false;

	/**
	 * Password uppercase requirement for password control.
	 * Used to inform user about password requirement.
	 */
	_passwordUppercaseReqMet = false;

	/**
	 * Password lowercase requirement for password control.
	 * Used to inform user about password requirement.
	 */
	_passwordLowercaseReqMet = false;

	/**
	 * Password digit requirement for password control.
	 * Used to inform user about password requirement.
	 */
	_passwordDigitReqMet = false;

	/**
	 * Requires user to enter in at least three unique characters.
	 */
	_passwordThreeUniqueCharacterCountReqMet = false;

	/**
	 * Password special character requirement for password control.
	 * Used to inform user about password requirement.
	 */
	_passwordSpecialCharacterReqMet = false;

	/**
	 * Requires user to enter the same password for confirm password field.
	 */
	_confirmPasswordNotMatchReqMet = false;

	private readonly _topLevelPasswordRequirementNode: PasswordRequirement = {
		name: 'ldsly.auth.form.requirements.title',
		type: PasswordRequirementType.None,
		children: []
	};

	/**
	 * Rxjs subscriptions for this component.
	 */
	private readonly _subscription = new Subscription();

	/**
	 * Transformer for password requirement.
	 */
	private _transformer = (node: PasswordRequirement, level: number) => {
		return {
			expandable: !!node.children && node.children.length > 0,
			name: node.name,
			level: level,
			type: node.type
		};
	};

	/**
	 * Tree control of password help component.
	 */
	// eslint-disable-next-line @typescript-eslint/member-ordering
	_treeControl = new FlatTreeControl<PasswordHelp>(
		(node) => node.level,
		(node) => node.expandable
	);

	/**
	 * Tree flattener of password help component.
	 */
	// eslint-disable-next-line @typescript-eslint/member-ordering
	_treeFlattener = new MatTreeFlattener(
		this._transformer,
		(node) => node.level,
		(node) => node.expandable,
		(node) => node.children
	);

	/**
	 * Data source of password help component.
	 */
	// eslint-disable-next-line @typescript-eslint/member-ordering
	_dataSource = new MatTreeFlatDataSource(this._treeControl, this._treeFlattener);

	/**
	 * Determines whether node has children.
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	_hasChild = (_: number, node: PasswordHelp) => node.expandable;

	/**
	 * Creates an instance of password help component.
	 * @param _log
	 */
	constructor(private _log: LogService) {}

	/**
	 * NgOnInit life cycle.
	 */
	ngOnInit(): void {
		this._log.trace('Initialized.', this);
	}

	/**
	 * NgOnDestroy life cycle.
	 */
	ngOnDestroy(): void {
		this._log.trace('Destroyed', this);
		this._subscription.unsubscribe();
	}

	/**
	 * Event handler when user expands password help context.
	 */
	_onTogglePasswordHelp(): void {
		this._log.trace('_onTogglePasswordHelp fired.', this);
		this.passwordHelpClicked.emit();
	}

	/**
	 * Whether password requirement was met.
	 * @param node
	 * @returns true if requirement met
	 */
	_passwordRequirementMet(node: PasswordRequirement): boolean {
		switch (node.type) {
			case PasswordRequirementType.Digit:
				return this._passwordDigitReqMet;
			case PasswordRequirementType.LowerCase:
				return this._passwordLowercaseReqMet;
			case PasswordRequirementType.UpperCase:
				return this._passwordUppercaseReqMet;
			case PasswordRequirementType.MinCharsLength:
				return this._passwordLengthReqMet;
			case PasswordRequirementType.SpecialChar:
				return this._passwordSpecialCharacterReqMet;
			case PasswordRequirementType.ThreeUniqueChar:
				return this._passwordThreeUniqueCharacterCountReqMet;
			default:
				this._log.warn('_passwordRequirementMet method passed in node without a valid type property.');
				return false;
		}
	}

	/**
	 * Gets class for password state. Three possible states:
	 * 1. Validation ran, not valid,
	 * 2. Validation ran, valid,
	 * 3. Validation NOT ran
	 * @param node
	 * @param pristine
	 * @returns class for password state
	 */
	_getClassForPasswordState(node: PasswordRequirement, pristine: boolean): string {
		if (pristine === true) {
			return 'auth--req-not-validated';
		} else {
			if (this._passwordRequirementMet(node)) {
				return 'auth--req-met';
			}
		}
		return 'auth--req-not-met';
	}

	/**
	 * Handles setting mat-tree control to either collapsed/expanded states and notifies parent of change.
	 */
	private _setMatTreeStateAndNotifyParent(state: PasswordResetMatTreeState): void {
		if (state === 'collapsed') {
			this._log.debug(`[togglePosition]: State is set to 'collapsed'`, this);
			if (this.matTree.treeControl.isExpanded(this._topLevelPasswordRequirementNode)) {
				this._log.debug(`[togglePosition]: topLevelPasswordRequirementNode is exapnded. Collapsing mat-tree control.`, this);
				this.matTree.treeControl.collapseAll();
				this.passwordHelpClicked.emit();
			}
		}
		// in case state is 'undefined' we check if its exapnded.
		else if (state === 'expanded') {
			this._log.debug(`[togglePosition]: State is set to 'exapnded'`, this);
			// if its collapsed
			if (this.matTree.treeControl.isExpanded(this._topLevelPasswordRequirementNode) === false) {
				this._log.debug(`[togglePosition]: topLevelPasswordRequirementNode is collapsed. Expanding mat-tree control.`, this);
				this.matTree.treeControl.expandAll();
				this.passwordHelpClicked.emit();
			}
		}
	}

	/**
	 * Validates form password field.
	 * @param form
	 * @returns form password field
	 */
	private _validateFormPasswordField$(passwordControl: AbstractControl): Observable<any> {
		return passwordControl.valueChanges.pipe(
			tap((value: string) => {
				if (passwordControl.hasError('number')) {
					this._passwordDigitReqMet = false;
				} else {
					this._passwordDigitReqMet = true;
				}
				if (passwordControl.hasError('uppercase')) {
					this._passwordUppercaseReqMet = false;
				} else {
					this._passwordUppercaseReqMet = true;
				}
				if (passwordControl.hasError('lowercase')) {
					this._passwordLowercaseReqMet = false;
				} else {
					this._passwordLowercaseReqMet = true;
				}
				if (passwordControl.hasError('nonAlphanumeric')) {
					this._passwordSpecialCharacterReqMet = false;
				} else {
					this._passwordSpecialCharacterReqMet = true;
				}
				if (passwordControl.hasError('uniqueChars')) {
					this._passwordThreeUniqueCharacterCountReqMet = false;
				} else {
					this._passwordThreeUniqueCharacterCountReqMet = true;
				}
				if ((value || '').length === 0 || passwordControl.hasError('minlength')) {
					this._passwordLengthReqMet = false;
				} else if (passwordControl.hasError('minlength') === false) {
					this._passwordLengthReqMet = true;
				}
			})
		);
	}
}
