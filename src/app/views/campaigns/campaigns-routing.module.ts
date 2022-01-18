import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignsContainerComponent } from './campaigns-container/campaigns-container.component';
import { CreateCampaignContinainerComponent } from './create-campaign-continainer/create-campaign-continainer.component';

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
				component: CreateCampaignContinainerComponent
			},
			{
				path: '**',
				component: CampaignListComponent
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
