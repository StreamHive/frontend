import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, VideosComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    
    constructor(
        public authenticationService: AuthenticationService
    ) { }

    title = 'frontend';
    
    login(username: string, password: string) {
        this.authenticationService.login(username, password)
    }
}
