import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CampaignEffectivenessReportComponent } from './campaign-effectiveness-report/campaign-effectiveness-report.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardState } from './dashboard.store.state.ts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportContainerComponent } from './report-container/report-container.component';

/**
 * Dashboard module.
 */
@NgModule({
	declarations: [DashboardComponent, ReportContainerComponent, CampaignEffectivenessReportComponent],
	imports: [CommonModule, DashboardRoutingModule, NgxsModule.forFeature([DashboardState]), NgApexchartsModule]
})
export class DashboardModule {}
