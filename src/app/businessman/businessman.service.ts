import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Businessman } from './businessman';
import { World } from '../world/world';
import { PersonSimplified } from '../world/models/person.simplified';
import { BehaviorSubject } from 'rxjs';
import { GameNotification } from '../world/models/game-notification';

const API = environment.ApiUrl + '/request/api';
const EMP_ROUTE = '/empresario';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class BusinessmanService{
    
    private gameNotification = new BehaviorSubject<GameNotification>(null);
    sharedGameNotification = this.gameNotification.asObservable();

    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    nextGameNotification(newGameSatatus: GameNotification) {
        if(newGameSatatus != null)
            this.gameNotification.next(newGameSatatus);
    }

    getInfo(
        idJogo: number,
        idEmp: number
    ){
        return this.httpClient.get<Businessman>(
            API + '/' + idJogo + EMP_ROUTE + '/' + idEmp
        );
    }

    getInfoMundo(
        idJogo: number
    ){
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        );
    }

    getInfoAgricultores(idJogo: number){
        return this.httpClient.post<PersonSimplified[]>(
            API + '/' + idJogo + MASTER_ROUTE +'/infoPessoasByClasse',
            2
        );
    }

    finalizaJogada(
        idJogo: number,
        idEmp: number
    ){
        return this.httpClient.post(
            API + '/' + idJogo + EMP_ROUTE + '/' + idEmp,
            {idEmp}
        )
    }

    verificaTodosComecaramEtapa(idJogo: number, etapa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaTodosComecaramEtapa/' + etapa
        );
    }

    getPapelSegundaEtapa(idJogo: number, idPessoa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/papelSegundaEtapa/' + idPessoa
        );
    }
}
