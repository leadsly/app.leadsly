import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { CampaignItemComponent } from './campaign-item/campaign-item.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsSandboxService } from './campaigns-sandbox.service';
import { CampaignsState } from './campaigns.store.state';

/**
 * Campaigns module.
 */
@NgModule({
	declarations: [CampaignListComponent, CampaignItemComponent],
	imports: [CommonModule, SharedModule, CampaignsRoutingModule, NgxsModule.forFeature([CampaignsState])],
	providers: [CampaignsSandboxService]
})
export class CampaignsModule {}
