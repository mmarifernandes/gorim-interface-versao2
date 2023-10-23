import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SupervisorHistory } from './supervisor-history';

const API = environment.ApiUrl + '/request/api';
const HISTORY_ROUTE = '/arquivoResumo';

@Injectable({
    providedIn: 'root'
})
export class SupervisorHistoryService{
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getHitory(
        idJogo: number,
        idFis: number
    ){
        return this.httpClient.get<SupervisorHistory>(
            API + '/' + idJogo + HISTORY_ROUTE + '/' + idFis
        );
    }
}