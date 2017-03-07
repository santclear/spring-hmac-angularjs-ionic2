import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { LoginService } from './login.service';
import { AccountEventsService } from '../account/account.events.service';
import { Users } from '../users/users';
import { Account } from '../account/account';

@Component({
	selector: 'login',
	providers: [LoginService],
	templateUrl: 'login.html'
})
export class Login {
	username: string;
	password: string;
	wrongCredentials: boolean;
	loginService: LoginService;
	account: Account;
	error: string;
	constructor(public navCtrl: NavController, form: FormBuilder, loginService: LoginService, accountEventService: AccountEventsService) {
		this.wrongCredentials = false;
		this.loginService = loginService;

		if(!loginService.isAuthenticated()) {
			accountEventService.subscribe((account) => {
				if (!account.authenticated) {
					if (account.error) {
						if (account.error.indexOf('BadCredentialsException') !== -1) {
							this.error = 'Username and/or password are invalid !';
						} else {
							this.error = account.error;
						}
					}
				}
			});
		} else {
			this.navCtrl.setRoot(Users);
		}
	}
	authenticate() {
		// event.preventDefault();
		this.loginService.authenticate(this.username, this.password).subscribe(account => {
			this.account = account;
			console.log(account)
			console.log('Successfully logged', account);
			this.navCtrl.setRoot(Users);
		});
	}
	
	logout(event?: Event): void {
		
	}
}
