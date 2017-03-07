import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HmacApp } from './app.component';
import { Login } from '../pages/login/login';
import { User } from '../pages/users/user';
import { Users } from '../pages/users/users';
import { IsAuthorized } from '../pages/utils/is-authorized.directive';
// import { IsAuthorizedComponent } from '../pages/utils/is-authorized.component';
import { Header } from '../pages/header/header';

import { AccountEventsService } from '../pages/account/account.events.service';
import { LoginService } from '../pages/login/login.service';
import { UsersService } from '../pages/users/users.service';
import { HmacHttpClient } from '../pages/utils/hmac-http-client';

@NgModule({
	declarations: [
		HmacApp,
		Login,
		User,
		Users,
		Header,
		IsAuthorized
		// IsAuthorizedComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(HmacApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		HmacApp,
		Login,
		User,
		Users,
		Header,
		// IsAuthorizedComponent
	],
	providers: [
		AccountEventsService,
		LoginService,
		UsersService,
		HmacHttpClient,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		// {
		// 	provide: Http,
		// 	useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, accountEventService: AccountEventsService) => {
		// 		return new HmacHttpClient(xhrBackend, requestOptions, accountEventService);
		// 	},
		// 	deps: [XHRBackend, RequestOptions, AccountEventsService],
		// 	multi: false
		// },
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
