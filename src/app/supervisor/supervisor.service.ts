import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { World } from '../world/world';
import { PostForm } from './postForm';
import { Supervisor } from './supervisor';

const API = environment.ApiUrl + '/request/api';
const SUPERVISOR_ROUTE = '/fiscal';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class SupervisorService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getInfo(idJogo: number, idFis: number){
        return this.httpClient.get<Supervisor>(
            API + '/' + idJogo + SUPERVISOR_ROUTE + '/' + idFis
        );
    }

    getInfoMundo(idJogo: number){
        return this.httpClient.get<World>(
            API + '/'+ idJogo + MASTER_ROUTE + '/infoMundo'
        );
    }

    finalizaJogada(
        idJogo: number,
        idFis: number,
        postForm: PostForm
    ){
        return this.httpClient.post(
            API + '/' + idJogo + SUPERVISOR_ROUTE + '/' + idFis,
            postForm
        )
    }

    verificaTodosComecaramEtapa(idJogo: number, etapa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaTodosComecaramEtapa/' + etapa
        );
    }
}