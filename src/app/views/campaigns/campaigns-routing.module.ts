import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';

const routes: Routes = [
	{
		path: '',
		component: CampaignListComponent,
		data: { title: 'ldsly.menu.campaigns' }
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
