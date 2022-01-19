import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardState } from './dashboard.store.state.ts';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
	declarations: [DashboardComponent],
	imports: [CommonModule, DashboardRoutingModule, NgxsModule.forFeature([DashboardState]), NgApexchartsModule]
})
export class DashboardModule {}
