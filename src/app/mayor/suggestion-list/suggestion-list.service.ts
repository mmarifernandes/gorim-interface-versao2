import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AldermanSuggestion } from 'src/app/alderman/alderman-suggestion/alderman-suggestion';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl + '/request/api';
const PREF_ROUTE = '/prefeito';

@Injectable({
    providedIn: 'root'
})
export class SuggestionListService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getSuggestions(idJogo: number, idPref: number){
        return this.httpClient.get<AldermanSuggestion[]>(
            API + '/' + idJogo + PREF_ROUTE + '/getSugestoesVereador/' + idPref
        );
    }

    postResponse(
        idJogo: number,
        idPref: number,
        response: AldermanSuggestion
    ){
        return this.httpClient.post(
            API + '/' + idJogo + PREF_ROUTE + '/adicionaRespostaSugestao/' + idPref,
            response
        );
    }
}