import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { VideosService } from './videos.service';
import { SasService } from '../sas.service';

@Component({
    selector: 'app-videos',
    standalone: true,
    imports: [NgFor, CommonModule],
    templateUrl: './videos.component.html',
    styleUrl: './videos.component.scss',
})
export class VideosComponent {
    songs = [
        'Billie Eilish - What Was I Made For (Official Music Video).mp4',
        'Lady Gaga - Bad Romance (Official Music Video).mp4'
    ]

    constructor(
        public videosService: VideosService,
        public sasService: SasService,
    ) {}

    
}
