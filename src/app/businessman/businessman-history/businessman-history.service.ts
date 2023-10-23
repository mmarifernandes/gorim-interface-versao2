import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BusinessmanHistory } from './businessman-history';

const API = environment.ApiUrl + '/request/api';
const HISTORY_ROUTE = '/arquivoResumo/';

@Injectable({
    providedIn: 'root'
})
export class BusinessmanHistoryService{
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getHitory(
        idJogo: number,
        idEmp: number
    ){
        return this.httpClient.get<BusinessmanHistory>(
            API + '/' + idJogo + HISTORY_ROUTE + idEmp
        );
    }
}