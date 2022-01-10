import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';

const routes: Routes = [
	{
		path: '',
		component: AboutComponent,
		data: { title: 'ldsly.menu.about' }
	}
];

/**
 * About routing module.
 */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AboutRoutingModule {}
