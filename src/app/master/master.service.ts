import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { World } from '../world/world';
import { PersonSimplified } from '../world/models/person.simplified';
import { BehaviorSubject } from 'rxjs';
import { GameNotification } from '../world/models/game-notification';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class MasterService {

    private gameNotification = new BehaviorSubject<GameNotification>(null);
    sharedGameNotification = this.gameNotification.asObservable();
    
    constructor(
        private httpClient : HttpClient
    ){
        //
    }

    nextGameNotification(newGameNotification: GameNotification){
        if(this.gameNotification != null)
            this.gameNotification.next(newGameNotification);
    }

    finalizarEtapa(idJogo: number, rodada: number, etapa: number){
        return this.httpClient.post(
            API + '/' + idJogo + MASTER_ROUTE + '/finalizarEtapa/' + rodada + '/' + etapa,
            null
        );
    }

    finalizarJogo(idJogo: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/finalizarJogo'
        );
    }

    getInfoMundo(
        idJogo: number
    ){
        console.log(API + '/' + idJogo + MASTER_ROUTE + '/infoMundo');
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        );
    }

    verificaFinalizados(idJogo: number, etapa: number){
        return this.httpClient.post<number[]>(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaFinalizados',
            etapa
        )
    }

    getInfoPessoas(idJogo: number, etapa: number){
        return this.httpClient.post<PersonSimplified[]>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoPessoasByEtapa',
            etapa
        )
    }

    changeFlagFimEtapa(idJogo: number){
        return this.httpClient.post(
            API + '/' + idJogo + MASTER_ROUTE + '/changeFlagFimEtapa',
            null
        );
    }
}
