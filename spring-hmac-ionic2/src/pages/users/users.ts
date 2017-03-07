import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { UsersService } from './users.service';
import { Account } from '../account/account';
import { LoginService } from '../login/login.service';
import { User } from './user';

@Component({
	selector: 'users',
	templateUrl: 'users.html',
	providers: [UsersService]
})
export class Users {
	authenticated: boolean;
	users: Array<Account>;
	constructor(public modalCtrl: ModalController, private userService: UsersService, loginService: LoginService) {
		if (loginService.isAuthenticated()) {
			this.authenticated = true;
		} else {
			this.authenticated = false;
		}
		this.users = [];
		userService.getAll().subscribe((users: Array<Account>) => {
			this.users = users
		});
	}
	onSelectUser(event: Event, id: string): void {
		event.preventDefault();
		let userModal = this.modalCtrl.create(User, { id: id });
		userModal.onDidDismiss(data => {
			this.users = [];
			this.userService.getAll().subscribe((users: Array<Account>) => {
				this.users = users
			});
		});
		userModal.present();
	}

	logout(event?: Event): void {

	}
}
