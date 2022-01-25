import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from 'app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CampaignEffectivenessReportContainerComponent } from './campaign-effectiveness-report-container/campaign-effectiveness-report-container.component';
import { CampaignEffectivenessReportComponent } from './campaign-effectiveness-report/campaign-effectiveness-report.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardState } from './dashboard.store.state.ts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampaignReportFiltersComponent } from './campaign-report-filters/campaign-report-filters.component';

/**
 * Dashboard module.
 */
@NgModule({
	declarations: [
		DashboardComponent,
		CampaignEffectivenessReportContainerComponent,
		CampaignEffectivenessReportComponent,
		CampaignReportFiltersComponent
	],
	imports: [CommonModule, SharedModule, DashboardRoutingModule, NgxsModule.forFeature([DashboardState]), NgApexchartsModule]
})
export class DashboardModule {}
