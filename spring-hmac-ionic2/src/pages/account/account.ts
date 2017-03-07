import lodash from 'lodash';

export class Account {
	id: number;
	login: string;
	profile: string;
	authorities: Array<string>;
	authenticated = true;
	constructor(account?: { id: number, login: string, profile: string, authorities: Array<string> }) {
		if (account) {
			lodash.assignIn(this, account);
			this.authenticated = false;
		}
	}
}
