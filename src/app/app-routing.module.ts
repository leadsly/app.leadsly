import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'about',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		loadChildren: () => import('./views/auth/auth.module').then((m) => m.AuthModule)
	},
	{
		path: 'account',
		loadChildren: () => import('./views/account/account.module').then((m) => m.AccountModule)
	},
	{
		path: 'profile',
		loadChildren: () => import('./views/profile/profile.module').then((m) => m.ProfileModule)
	},
	{
		path: 'about',
		loadChildren: () => import('./views/about/about.module').then((m) => m.AboutModule)
	},
	{
		path: 'campaigns',
		loadChildren: () => import('./views/campaigns/campaigns.module').then((m) => m.CampaignsModule)
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
	},
	{
		path: 'settings',
		loadChildren: () => import('./views/settings/settings.module').then((m) => m.SettingsModule)
	},
	{
		path: 'examples',
		loadChildren: () => import('./views/examples/examples.module').then((m) => m.ExamplesModule)
	},
	{
		path: '**',
		redirectTo: 'about'
	}
];

/**
 * App routing module.
 */
@NgModule({
	// useHash supports github.io demo page, remove in your app
	imports: [
		RouterModule.forRoot(routes, {
			useHash: false,
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: NoPreloading,
			enableTracing: false,
			relativeLinkResolution: 'legacy'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
