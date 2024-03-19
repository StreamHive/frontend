import { Injectable } from '@angular/core';
import { EnvironmentService } from '../../environment/environment.service';

@Injectable({
    providedIn: 'root'
})
export class VideosService {

    constructor(
        private environmentService: EnvironmentService
    ) { }

    rootUrl = this.environmentService.values.videoRootUrl
    apiUrl = this.environmentService.values.videoApiUrl
    currentSas = this.environmentService.values.currentSas

}
