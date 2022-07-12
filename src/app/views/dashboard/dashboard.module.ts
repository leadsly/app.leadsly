import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from 'app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CampaignGeneralReportContainerComponent } from './campaign-general-report-container/campaign-general-report-container.component';
import { CampaignGeneralReportComponent } from './campaign-general-report/campaign-general-report.component';
import { CampaignReportFiltersComponent } from './campaign-report-filters/campaign-report-filters.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardState } from './dashboard.store.state.ts';
import { DashboardComponent } from './dashboard/dashboard.component';

/**
 * Dashboard module.
 */
@NgModule({
	declarations: [DashboardComponent, CampaignGeneralReportComponent, CampaignGeneralReportContainerComponent, CampaignReportFiltersComponent],
	imports: [CommonModule, SharedModule, DashboardRoutingModule, NgxsModule.forFeature([DashboardState]), NgApexchartsModule]
})
export class DashboardModule {}
