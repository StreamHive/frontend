import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { MsalGuard, MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, protectedResources } from './auth-config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            MsalModule.forRoot(new PublicClientApplication(msalConfig),
                {
                    // The routing guard configuration. 
                    interactionType: InteractionType.Redirect,
                    authRequest: {
                        scopes: protectedResources.videosReadApi.scopes
                    }
                },
                {
                    // MSAL interceptor configuration.
                    // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
                    interactionType: InteractionType.Redirect,
                    protectedResourceMap: new Map([
                        [protectedResources.videosReadApi.endpoint, protectedResources.videosReadApi.scopes]
                    ])
                })
        ),
        provideRouter(routes),
        provideClientHydration(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        MsalGuard
    ]
};
