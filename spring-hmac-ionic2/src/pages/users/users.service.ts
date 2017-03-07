import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import * as AppUtils from '../utils/app.utils';
import { Observable } from 'rxjs/Observable';
import { Account } from '../account/account';
import { HmacHttpClient } from '../utils/hmac-http-client';

@Injectable()
export class UsersService {
	constructor(public http: HmacHttpClient) {
	}
	getAll(): Observable<Array<Account>> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers, withCredentials: true });

		return this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/users', options)
			.map((res: Response) => {
				let users: Array<Account> = [];
				let jsonResults: Array<any> = res.json();
				jsonResults.forEach((jsonResult) => {
					users.push(new Account(jsonResult));
				});
				return users;
			});
	}
	getById(id: string): Observable<Account> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers, withCredentials: true });

		return this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/users/' + id, options).map((res: Response) => {
			return new Account(res.json());
		});
	}
	getProfiles(): Observable<Array<string>> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers, withCredentials: true });

		return this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/users/profiles', options).map((res: Response) => res.json());
	}
	saveUser(account: Account): Observable<Account> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers, withCredentials: true });

		return this.http.put(AppUtils.BACKEND_API_ROOT_URL + '/users/' + account.id, JSON.stringify(account), options)
			.map((res: Response) => {
				return new Account(res.json());
			});
	}
}
