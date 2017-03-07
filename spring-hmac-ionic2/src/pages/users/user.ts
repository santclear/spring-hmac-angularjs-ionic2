import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Account } from '../account/account';
import { UsersService } from './users.service';
import { LoginService } from '../login/login.service';

@Component({
	selector: 'user',
	templateUrl: 'user.html',
	providers: [UsersService]
})
export class User {
	userForm: FormGroup;
	user: Account;
	profiles: Array<string>;
	constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder, public params: NavParams, private userService: UsersService, loginService: LoginService) {
		this.user = new Account();
		this.profiles = [];
		this.userForm = this.formBuilder.group({
			login: ['', Validators.required],
			profile: ['', Validators.required],
		});
		this.getProfiles();
	}
	ngOnInit(): void {
		this.getUser(this.params.get('id'));
	}
	getUser(id: string): void {
		this.userService.getById(id).subscribe((user: Account) => {
			this.user = user
		});
	}
	getProfiles(): void {
		this.userService.getProfiles().subscribe((profiles: Array<string>) => this.profiles = profiles);
	}
	saveUser(): void {
		this.userService.saveUser(this.user).subscribe(() => {
			this.viewCtrl.dismiss('');
		});
	}
	cancel(): void {
		this.viewCtrl.dismiss('');
	}
}
