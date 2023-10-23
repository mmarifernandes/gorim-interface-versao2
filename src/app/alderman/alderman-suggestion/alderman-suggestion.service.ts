import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mayor } from 'src/app/mayor/mayor';
import { environment } from 'src/environments/environment';
import { AldermanSuggestion } from './alderman-suggestion';

const API = environment.ApiUrl + '/request/api';
const VER_ROUTE = '/vereador';

@Injectable({
    providedIn: 'root'
})
export class AldermanSuggestionService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getInfoPrefeito(
        idJogo: number,
        idVer: number
    ){
        return this.httpClient.get<Mayor>(
            API + '/' + idJogo + VER_ROUTE + '/infoPrefeito/' + idVer
        );
    }

    postSuggestion(
        idJogo: number,
        idVer: number,
        sugestao: AldermanSuggestion
    ){
        return this.httpClient.post(
            API + '/' + idJogo + VER_ROUTE + '/adicionaSugestao/' + idVer,
            sugestao
        );
    }
}