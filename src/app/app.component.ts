import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { Subject, filter, takeUntil } from 'rxjs';
import { EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, VideosComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    private readonly _destroying$ = new Subject<void>();
    
    constructor(
        @Inject(MSAL_GUARD_CONFIG)
        private msalGuardConfig: MsalGuardConfiguration,
        private broadcastService: MsalBroadcastService,
        private authService: MsalService
    ) { }

    title = 'frontend';
    loginDisplay = false;

    ngOnInit() {
        this.broadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                takeUntil(this._destroying$)
            )
            .subscribe(() => {
                this.setLoginDisplay();
                this.checkAndSetActiveAccount()
            })

        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
            )
            .subscribe((result: EventMessage) => {
                console.log(result);
            });

    }

    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }

    setLoginDisplay() {
        console.log(this.authService.instance.getActiveAccount())
        this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
        console.log(this.loginDisplay)
    }

    login() {
        if (this.msalGuardConfig.authRequest) {
            this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
        } else {
            this.authService.loginRedirect();
        }
    }

    logout() {
        this.authService.logoutRedirect({
            postLogoutRedirectUri: 'http://localhost:4200/'
        });
    }

    checkAndSetActiveAccount() {

        let activeAccount = this.authService.instance.getActiveAccount();
        
        if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
            let accounts = this.authService.instance.getAllAccounts();
            this.authService.instance.setActiveAccount(accounts[0]);
        }
    }
}
