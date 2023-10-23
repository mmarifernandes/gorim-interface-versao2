import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

import { PostForm } from './postForm';
import { World } from '../world/world';
import { Mayor } from './mayor';
import { AldermanSuggestion } from '../alderman/alderman-suggestion/alderman-suggestion';
import { SharedDataWrap } from '../world/models/shared-data-wrap';

const API = environment.ApiUrl + '/request/api';
const MAYOR_ROUTE = '/prefeito';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class MayorService {
    
    private newSuggestion = new BehaviorSubject<SharedDataWrap>(null);
    sharedNewSuggestion = this.newSuggestion.asObservable();
    
    constructor(
        private httpClient: HttpClient
    ){ }

    nextSuggestion(newSuggestion: AldermanSuggestion) {
        if(newSuggestion){
            let wrap: SharedDataWrap = {time: Date.now(), data: newSuggestion} as SharedDataWrap;
            this.newSuggestion.next(wrap);
        }
    }

    getInfo(idJogo: number, idPref: number){
        return this.httpClient.get<Mayor>(
            API + '/' + idJogo + MAYOR_ROUTE + '/' + idPref
        );
    }

    getInfoMundo(idJogo: number){
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        );
    }

    finalizaJogada(
        idJogo: number,
        idPref: number,
        postForm: PostForm
    ){
        return this.httpClient.post(
            API + '/' + idJogo + MAYOR_ROUTE + '/' + idPref,
            postForm
        )
    }

    verificaTodosComecaramEtapa(idJogo: number, etapa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaTodosComecaramEtapa/' + etapa
        );
    }
}