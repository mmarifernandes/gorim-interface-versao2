import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { World } from 'src/app/world/world';

import { environment } from 'src/environments/environment';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

@Injectable()
export class BeginService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    iniciaJogada(
        quantidadeJogadores: number
    ){
        return this.httpClient.post<number>(
            API + MASTER_ROUTE,
            {quantidadeJogadores}
        );
    }
    
}