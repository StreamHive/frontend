import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import { AuthenticationService } from './authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SasService {

    constructor(
        private httpClient: HttpClient,
        private environmentService: EnvironmentService,
        private authenticationService: AuthenticationService,
        private cookieService: CookieService,
    ) {
        this.authenticationService.newLogin$
            .pipe(filter(x => x)) // Makes sure we have an access token first
            .subscribe(() => this.initSas())
    }

    initSas() {
        console.log('Init sas token')
        if (!this.authenticationService.getAccessToken()) {
            throw Error('You must have a valid access token to ask for sas token')
        }

        this.httpClient.get<{sasToken: string}>(`${this.environmentService.values.videoApiUrl}/sas`,
            {
                headers: {
                    "Authorization": "Bearer " + this.authenticationService.getAccessToken()
                }
            }
        ).subscribe((sas) => {
            this.cookieService.set('sas', sas.sasToken)
        })
    }

    getSasFromCookie() {
        return this.cookieService.get('sas')
    }

}
