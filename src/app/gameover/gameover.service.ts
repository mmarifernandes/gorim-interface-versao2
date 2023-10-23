import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl + '/request/api/';
const MASTER_ROUTE = '/mestre/';

@Injectable({
    providedIn: 'root'
})
export class GameOverService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getGameOverData(idJogo: number){
        return this.httpClient.get(
            API + idJogo + MASTER_ROUTE + 'gameover'
        );
    }
}