import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { CampaignItemComponent } from './campaign-item/campaign-item.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignsContainerComponent } from './campaigns-container/campaigns-container.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsSandboxService } from './campaigns-sandbox.service';
import { CampaignsState } from './campaigns.store.state';
import { CreateCampaignContinainerComponent } from './create-campaign-continainer/create-campaign-continainer.component';
import { CreateCampaignWizardComponent } from './create-campaign-wizard/create-campaign-wizard.component';
import { NotesComponent } from './notes/notes.component';

/**
 * Campaigns module.
 */
@NgModule({
	declarations: [
		CampaignListComponent,
		CampaignItemComponent,
		NotesComponent,
		CreateCampaignContinainerComponent,
		CreateCampaignWizardComponent,
		CampaignsContainerComponent
	],
	imports: [CommonModule, SharedModule, CampaignsRoutingModule, NgxsModule.forFeature([CampaignsState])],
	providers: [CampaignsSandboxService]
})
export class CampaignsModule {}
