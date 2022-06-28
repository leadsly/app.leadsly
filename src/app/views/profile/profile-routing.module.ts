import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/core/core.module';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		canActivate: [AuthGuardService],
		data: { title: 'ldsly.profile' },
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: ProfileComponent
			}
		]
	}
];

/**
 * User account routing module.
 */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {}
