import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { VideosService } from './videos.service';

import { IdTokenClaims, PromptValue } from '@azure/msal-common';
import { AccountInfo, AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest, SsoSilentRequest } from '@azure/msal-browser';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalGuard } from '@azure/msal-angular';
//import { b2cPolicies } from './auth-config';

@Component({
    selector: 'app-videos',
    standalone: true,
    imports: [NgFor, CommonModule],
    templateUrl: './videos.component.html',
    styleUrl: './videos.component.scss',
    providers: [
        MsalService,
        MsalGuard,
        MsalBroadcastService,
    ],
})
export class VideosComponent {
    songs = [
        'Billie Eilish - What Was I Made For (Official Music Video).mp4',
        'Lady Gaga - Bad Romance (Official Music Video).mp4'
    ]

    constructor(
        public videosService: VideosService
    ) {}

}
