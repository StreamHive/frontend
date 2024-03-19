import { Injectable, isDevMode } from '@angular/core';
import { environment } from './environment';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
    
    values = environment

    constructor() { 
        console.log(this.values.production)
    }
}
