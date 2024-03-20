import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import { AccessTokenDto } from './token.dto';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	isLogin = false
	currentUsername?: string
	newLogin$ = new BehaviorSubject<boolean>(false)

	constructor(
		private httpService: HttpClient,
		private environmentService: EnvironmentService,
		private cookieService: CookieService,
	) { 
		if (this.cookieService.get('access_token').length > 0) { // TODO: checker si le token est valide et non pas juste s'il existe
			this.isLogin = true
			this.newLogin$.next(true)
		}
	}

	login(username: string, password: string) {
		this.httpService.post<AccessTokenDto>(this.environmentService.values.videoApiUrl + '/auth/login', {
			username: username,
			password: password,
		}).subscribe((token) => {
			this.isLogin = true
			this.currentUsername = username
			this.cookieService.set('access_token', token.access_token)
			this.newLogin$.next(true)
		})
	}

	getAccessToken() {
		return this.cookieService.get('access_token')
	}
}
