import { Directive, ElementRef, Input } from '@angular/core';
import { DefaultValueAccessor } from '@angular/forms';
import { LoginService } from '../login/login.service';

@Directive({
	selector: '[is-authorized]',
	providers: [LoginService, DefaultValueAccessor]
})
export class IsAuthorized {
	@Input() isAuthorized: string;

	constructor(private _elementRef: ElementRef, private loginService: LoginService) {	}
	ngOnInit(): void {
		if (this.isAuthorized && this.isAuthorized.trim() !== '' && !this.loginService.isAuthorized([this.isAuthorized])) {
			let el: HTMLElement = this._elementRef.nativeElement;
			el.parentNode.removeChild(el);
		}
	}
}
