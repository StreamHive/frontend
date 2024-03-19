import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MsalRedirectComponent } from '@azure/msal-angular';

bootstrapApplication(AppComponent, appConfig)
    .then(appRef => {
        appRef.bootstrap(MsalRedirectComponent)
    })
    .catch((err) => console.error(err))

// bootstrapApplication(PhotoAppComponent, {
//     providers: [
//         {
//             provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api' % 7D,
//             importProvidersFrom(
//                 LibraryModule.forRoot()
//         ),
//     ]
// })

