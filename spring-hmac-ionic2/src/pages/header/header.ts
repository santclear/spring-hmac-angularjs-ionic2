import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountEventsService } from '../account/account.events.service';
import { LoginService } from '../login/login.service';
import { Login } from '../login/login';

@Component({
	selector: 'header',
	templateUrl: 'header.html',
	providers: [LoginService],
})
export class Header {
	loginService: LoginService;

	@Input() authenticatedInput: boolean;
	@Output() logoutOutput = new EventEmitter();

	constructor(public navCtrl: NavController, accountEventService: AccountEventsService, loginService: LoginService) {
		this.loginService = loginService;
		accountEventService.subscribe((account) => {
			if (!account.authenticated) {
				this.authenticatedInput = false;
				this.loginService.logout(false);
			} else {
				this.authenticatedInput = true;
			}
		});
	}
	logout(event: Event): void {
		event.preventDefault();
		this.loginService.logout().then(login => {
			this.navCtrl.setRoot(Login);
			this.logoutOutput.emit({});
		});
	}
}