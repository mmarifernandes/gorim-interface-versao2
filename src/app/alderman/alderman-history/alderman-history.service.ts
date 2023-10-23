import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AldermanHistory } from './alderman-history';

const API = environment.ApiUrl + '/request/api';
const HISTORY_ROUTE = '/arquivoResumo/';

@Injectable({
    providedIn: 'root'
})
export class AldermanHistoryService{
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getHitory(
        idJogo: number,
        idVer: number
    ){
        return this.httpClient.get<AldermanHistory>(
            API + '/' + idJogo + HISTORY_ROUTE + idVer
        );
    }
}