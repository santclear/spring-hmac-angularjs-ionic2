import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Account } from '../account/account';
import { AccountEventsService } from '../account/account.events.service';
import { Login } from './login';
import { SecurityToken } from '../security/securityToken';
import { Observable } from 'rxjs/Observable';
import * as AppUtils from '../utils/app.utils';
import { HmacHttpClient } from '../utils/hmac-http-client';

@Injectable()
export class LoginService {
	constructor(private http: HmacHttpClient, private accountEventService: AccountEventsService) {
	}
	authenticate(username: string, password: string): Observable<Account> {

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers, withCredentials: true });

		return this.http.post(AppUtils.BACKEND_API_ROOT_URL + AppUtils.BACKEND_API_AUTHENTICATE_PATH, JSON.stringify({ login: username, password: password }), options)
			.map((res: Response) => {
				let securityToken: SecurityToken = new SecurityToken(
					{
						publicSecret: res.headers.get(AppUtils.HEADER_X_SECRET),
						securityLevel: res.headers.get(AppUtils.HEADER_WWW_AUTHENTICATE)
					}
				);
				let csrfClaimHeader = res.headers.get(AppUtils.CSRF_CLAIM_HEADER);
				let storageAccountToken = res.text();
				let storageSecurityToken = JSON.stringify(securityToken);
				localStorage.setItem(AppUtils.CSRF_CLAIM_HEADER, csrfClaimHeader);
				localStorage.setItem(AppUtils.STORAGE_ACCOUNT_TOKEN, storageAccountToken);
				localStorage.setItem(AppUtils.STORAGE_SECURITY_TOKEN, storageSecurityToken);
				
				let account: Account = new Account(res.json());
				this.sendLoginSuccess(account);
				return account;
			});
	}
	sendLoginSuccess(account?: Account): void {
		if (!account) {
			let storageAccountToken = localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
			account = new Account(JSON.parse(storageAccountToken));
		}
		this.accountEventService.loginSuccess(account);
	}
	isAuthenticated(): boolean {
		let storageAccountToken = localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
		return !!storageAccountToken;
	}
	removeAccount(): void {
		localStorage.removeItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
		localStorage.removeItem(AppUtils.STORAGE_SECURITY_TOKEN);
		localStorage.removeItem(AppUtils.CSRF_CLAIM_HEADER);
	}
	logout(callServer: boolean = true): Promise<Login> {
		return new Promise(resolve => {
			console.log('Logging out');

			if (callServer) {
				
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				let options = new RequestOptions({ headers: headers, withCredentials: true });

				this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/logout', options).subscribe(resultado => {
					let storageAccountToken = localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
					this.accountEventService.logout(new Account(JSON.parse(storageAccountToken)));
					this.removeAccount();
					resolve(Login);
				});
			} else {
				this.removeAccount();
				resolve(Login);
				
			}
		});
	}
	isAuthorized(roles: Array<string>): boolean {
		let authorized: boolean = false;
		if (this.isAuthenticated() && roles) {
			let storageAccountToken = localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
			let account: Account = new Account(JSON.parse(storageAccountToken));
			if (account && account.authorities) {

				roles.forEach((role: string) => {
					if (account.authorities.indexOf(role) !== -1) {
						authorized = true;
					}
				});
			}
		}
		return authorized;
	}
}
