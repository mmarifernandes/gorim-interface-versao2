import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { World } from '../world/world';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class AlternativeSecondStagePageService {
    constructor(
        private httpClient: HttpClient
    ){ }

    getInfoMundo(idJogo: number){
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        );
    }
}