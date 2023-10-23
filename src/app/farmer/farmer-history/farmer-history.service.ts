import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FarmerHistory } from './farmer-history';

const API = environment.ApiUrl + '/request/api';
const HISTORY_ROUTE = '/arquivoResumo/';

@Injectable({
    providedIn: 'root'
})
export class FarmerHistoryService {

    constructor(
        private httpClient: HttpClient
    ){ }

    getHistory(
        idJogo: number,
        idAgr: number
    ){
        return this.httpClient.get<FarmerHistory>(
            API + '/' + idJogo + HISTORY_ROUTE + idAgr
        );
    }
}