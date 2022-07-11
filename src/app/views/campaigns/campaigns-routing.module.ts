import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/core/core.module';
import { LeadslyConnectedGuard } from 'app/core/leadsly/leadsly-connected.guard';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignWizardContainerComponent } from './campaign-wizard-container/campaign-wizard-container.component';
import { CampaignsContainerComponent } from './campaigns-container/campaigns-container.component';

const routes: Routes = [
	{
		path: '',
		component: CampaignsContainerComponent,
		canActivate: [AuthGuardService],
		children: [
			{
				path: '',
				component: CampaignListComponent,
				data: { title: 'ldsly.menu.campaigns' },
				pathMatch: 'full'
			},
			{
				path: 'create',
				component: CampaignWizardContainerComponent,
				canActivate: [LeadslyConnectedGuard]
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
