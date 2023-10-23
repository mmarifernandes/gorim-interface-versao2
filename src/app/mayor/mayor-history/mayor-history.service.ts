import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MayorHistory } from './mayor-history';

const API = environment.ApiUrl + '/request/api';
const HISTORY_ROUTE = '/arquivoResumo/';

@Injectable({
    providedIn: 'root'
})
export class MayorHistoryService{
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getHitory(
        idJogo: number,
        idPref: number
    ){
        return this.httpClient.get<MayorHistory>(
            API + '/' + idJogo + HISTORY_ROUTE + idPref
        );
    }
}