import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { routeAnimations, LocalStorageService } from '../core/core.module';
import { actionSettingsChangeAnimationsPageDisabled } from '../core/settings/settings.actions';
import { Store } from '@ngxs/store';
import { SettingsState } from 'app/core/settings/settings.store.state';
import * as Settings from 'app/core/settings/settings.store.actions';
import * as Auth from 'app/core/auth/auth.store.actions';
import { LogService } from 'app/core/logger/log.service';
import { Language } from 'app/core/settings/settings.model';
import { MatSelectChange } from '@angular/material/select';
import { AuthState } from 'app/core/auth/auth.store.state';

/**
 * AppComponent displays navbar, footer and named router-outlet '#o=outlet'.
 */
@Component({
	selector: 'odm-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [routeAnimations]
})
export class AppComponent implements OnInit {
	/**
	 * Indicates the environment the application is running under.
	 */
	_isProd = env.production;

	/**
	 * String value of DEV or PROD depending on the environment.
	 */
	_envName = env.envName;

	/**
	 * String value representing current version of the app. For example 10.0.2.
	 */
	_version = env.versions.app as string;

	/**
	 * Gets the current year.
	 */
	_year = new Date().getFullYear();

	/**
	 * Gets left hand side logo url.
	 */
	_logo = (require('../../assets/logo.png') as { default: string }).default;

	/**
	 * List of currently available languages.
	 */
	_languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he'];

	/**
	 * Navigation options.
	 */
	_navigation = [
		{ link: 'about', label: 'odm.menu.about' },
		{ link: 'feature-list', label: 'odm.menu.features' },
		{ link: 'examples', label: 'odm.menu.examples' }
	];

	/**
	 * Navigation options for side drawer.
	 */
	_navigationSideMenu = [...this._navigation, { link: 'settings', label: 'odm.menu.settings' }];

	/**
	 * Stream indicating if user is authenticated.
	 */
	_isAuthenticated$: Observable<boolean>;

	/**
	 * Stream for sticky header setting.
	 */
	_stickyHeader$: Observable<boolean>;

	/**
	 * Stream for current language setting.
	 */
	_language$: Observable<string>;

	/**
	 * Stream for current theme.
	 */
	_theme$: Observable<string>;

	/**
	 * Creates an instance of app component.
	 * @param store
	 * @param storageService
	 * @param store
	 * @param log
	 */
	constructor(private storageService: LocalStorageService, private store: Store, private log: LogService) {}

	/**
	 * Determines whether browser is IE, Edge or Safari
	 * @returns true if browser is IE, Edge or Safari
	 */
	private static isIEorEdgeOrSafari() {
		return ['ie', 'edge', 'safari'].includes(browser().name);
	}

	/**
	 * NgOnInit life cycle. Performs local storage test as well as sets the state of the application.
	 */
	ngOnInit(): void {
		this.storageService.testLocalStorage();

		if (AppComponent.isIEorEdgeOrSafari()) {
			this.store.dispatch(
				actionSettingsChangeAnimationsPageDisabled({
					pageAnimationsDisabled: true
				})
			);
		}

		this._isAuthenticated$ = this.store.select(AuthState.selectIsAuthenticated);
		this._stickyHeader$ = this.store.select(SettingsState.selectStickyHeaderSettings);
		this._language$ = this.store.select(SettingsState.selectLanguageSettings);
		this._theme$ = this.store.select(SettingsState.selectEffectiveTheme);
	}

	/**
	 * Event handler for logging user in
	 */
	onLoginClick(): void {
		this.log.debug('onLoginClick handler fired', this);
		this.store.dispatch(new Auth.Login());
	}

	/**
	 * Event handler for logging user out
	 */
	onLogoutClick(): void {
		this.log.debug('onLogoutClick handler fired', this);
		this.store.dispatch(new Auth.Logout());
	}

	/**
	 * Language select handler for nav bar language selection.
	 * @param MatSelectChange
	 */
	onLanguageSelect(event: MatSelectChange): void {
		this.log.debug(`onLanguageSelect handler fired with: ${event.value as Language}.`, this);
		const languageSelected = { language: event.value as Language };
		this.store.dispatch(new Settings.ChangeLanguage(languageSelected));
	}
}
