import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedDataWrap } from '../world/models/shared-data-wrap';
import { World } from '../world/world';
import { Alderman } from './alderman';
import { AldermanSuggestion } from './alderman-suggestion/alderman-suggestion';

const API = environment.ApiUrl + '/request/api';
const VER_ROUTE = '/vereador';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class AldermanService {

    private newSuggestionResponse = new BehaviorSubject<SharedDataWrap>(null);
    sharedSuggestions = this.newSuggestionResponse.asObservable();

    constructor(
        private httpClient: HttpClient
    ){ }

    nextNewSuggestionResponses(newSuggestionResponse: AldermanSuggestion) {
        if(newSuggestionResponse != null){
            let wrap: SharedDataWrap = {time: Date.now(), data: newSuggestionResponse} as SharedDataWrap;
            this.newSuggestionResponse.next(wrap);
        }
    }

    getInfo(idJogo: number, idVer: number){
        return this.httpClient.get<Alderman>(
            API + '/' + idJogo + VER_ROUTE + '/' + idVer
        );
    }

    getInfoMundo(idJogo: number){
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        );
    }

    finalizaJogada(idJogo: number, idVer: number){
        return this.httpClient.post(
            API + '/' + idJogo + VER_ROUTE + '/' + idVer,
            null
        );
    }

    verificaTodosComecaramEtapa(idJogo: number, etapa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaTodosComecaramEtapa/' + etapa
        );
    }
}