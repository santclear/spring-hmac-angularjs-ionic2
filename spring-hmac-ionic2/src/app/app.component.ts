import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Login } from '../pages/login/login';
import { LoginService } from '../pages/login/login.service';
import { AccountEventsService } from '../pages/account/account.events.service';

@Component({
	selector: 'hmac-app',
	templateUrl: 'app.html',
})
export class HmacApp {
	@ViewChild(Nav) nav: Nav;
	rootPage: any = Login;

	authenticated: boolean;

	constructor(platform: Platform, public loginService: LoginService, public accountEventService: AccountEventsService) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();

			if (!loginService.isAuthenticated()) {
				this.rootPage = Login;
			} else {
				loginService.sendLoginSuccess();
			}
		});
	}
	usuarios() {

	}
}
