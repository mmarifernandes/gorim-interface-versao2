import { Component, OnInit } from '@angular/core';
import { WebStorageService } from '../world/web-storage/webstorage.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit{
    
    constructor(
        private webStorageService: WebStorageService
    ){ }

    ngOnInit(){
        this.webStorageService.clearAll();
    }

}