import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignWizardContainerComponent } from './campaign-wizard-container/campaign-wizard-container.component';
import { CampaignsContainerComponent } from './campaigns-container/campaigns-container.component';

const routes: Routes = [
	{
		path: '',
		component: CampaignsContainerComponent,
		children: [
			{
				path: '',
				component: CampaignListComponent,
				data: { title: 'ldsly.menu.campaigns' },
				pathMatch: 'full'
			},
			{
				path: 'create',
				component: CampaignWizardContainerComponent
			}
		]
	}
];

/**
 * Campaigns routing module.
 */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CampaignsRoutingModule {}
