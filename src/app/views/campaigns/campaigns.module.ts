import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CampaignItemComponent } from './campaign-item/campaign-item.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignWizardContainerComponent } from './campaign-wizard-container/campaign-wizard-container.component';
import { CampaignsContainerComponent } from './campaigns-container/campaigns-container.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsSandboxService } from './campaigns-sandbox.service';
import { CreateCampaignDetailsComponent } from './create-campaign-details/create-campaign-details.component';
import { CreateCampaignMessagingComponent } from './create-campaign-messaging/create-campaign-messaging.component';
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
		CreateCampaignWizardComponent,
		CampaignsContainerComponent,
		CreateCampaignDetailsComponent,
		CreateCampaignMessagingComponent,
		CampaignWizardContainerComponent
	],
	imports: [CommonModule, SharedModule, CampaignsRoutingModule],
	providers: [CampaignsSandboxService]
})
export class CampaignsModule {}
