import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import { AccessTokenDto } from './token.dto';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	isLogin = false
	currentUsername?: string
	currentAccessToken?: string

	constructor(
		private httpService: HttpClient,
		private environmentService: EnvironmentService,
	) { }

	login(username: string, password: string) {
		this.httpService.post<AccessTokenDto>(this.environmentService.values.videoApiUrl + '/auth/login', {
			username: username,
			password: password,
		}).subscribe((token) => {
			this.isLogin = true
			this.currentUsername = username
			this.currentAccessToken = token.access_token
		})
	}
}
