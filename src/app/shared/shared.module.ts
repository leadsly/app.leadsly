import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faMediumM } from '@fortawesome/free-brands-svg-icons';
import {
	faBook,
	faCaretDown,
	faCaretUp,
	faCheck,
	faEdit,
	faExclamationTriangle,
	faFilter,
	faLanguage,
	faLightbulb,
	faPaintBrush,
	faPlus,
	faSquare,
	faStream,
	faTasks,
	faTimes,
	faTrash,
	faUserSecret,
	faWindowMaximize
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { LdslyGhostBlockComponent } from './components/ldsly-ghost-block/ldsly-ghost-block.component';
import { LdslySpinnerComponent } from './components/ldsly-spinner/ldsly-spinner.component';
import { PasswordHelpComponent } from './components/password-help/password-help.component';
import { ServerSideErrorComponent } from './components/server-side-error/server-side-error.component';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';
import { ToMMSSPipe } from './pipes/to-mmss.pipe';
import { LdslyGhostAnimationService } from './services/ldsly-ghost-animation.service';

/**
 * Shared module.
 */
@NgModule({
	declarations: [
		LdslyGhostBlockComponent,
		LdslySpinnerComponent,
		ServerSideErrorComponent,
		VerificationCodeComponent,
		PasswordHelpComponent,
		ToMMSSPipe
	],
	providers: [LdslyGhostAnimationService, { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		TranslateModule,

		// Angular material
		MatButtonModule,
		MatSelectModule,
		MatTabsModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatChipsModule,
		MatCardModule,
		MatCheckboxModule,
		MatListModule,
		MatMenuModule,
		MatIconModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatSlideToggleModule,
		MatDividerModule,
		MatStepperModule,
		MatExpansionModule,
		MatTreeModule,
		LayoutModule,
		MatGridListModule,
		MatAutocompleteModule,

		FontAwesomeModule
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		TranslateModule,

		// Angular material
		MatButtonModule,
		MatMenuModule,
		MatTabsModule,
		MatChipsModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatCheckboxModule,
		MatCardModule,
		MatListModule,
		MatSelectModule,
		MatIconModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatSlideToggleModule,
		MatDividerModule,
		MatSliderModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatStepperModule,
		MatExpansionModule,
		MatTreeModule,
		LayoutModule,
		MatGridListModule,
		MatAutocompleteModule,

		FontAwesomeModule,

		// Components
		LdslyGhostBlockComponent,
		LdslySpinnerComponent,
		ServerSideErrorComponent,
		VerificationCodeComponent,
		PasswordHelpComponent,

		// Pipes
		ToMMSSPipe
	]
})
export class SharedModule {
	/**
	 * Creates an instance of shared module.
	 * @param faIconLibrary
	 */
	constructor(faIconLibrary: FaIconLibrary) {
		faIconLibrary.addIcons(
			faGithub,
			faMediumM,
			faPlus,
			faEdit,
			faTrash,
			faTimes,
			faCaretUp,
			faCaretDown,
			faExclamationTriangle,
			faFilter,
			faTasks,
			faCheck,
			faSquare,
			faLanguage,
			faPaintBrush,
			faLightbulb,
			faWindowMaximize,
			faStream,
			faBook,
			faUserSecret
		);
	}
}
