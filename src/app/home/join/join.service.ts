import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonSimplified } from 'src/app/world/models/person.simplified';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class JoinService {

    constructor(
        private httpClient: HttpClient
    ){ }
    getListaMundos(){
        return this.httpClient.get<[]>(
            API + '/mundos'
        );
    }

    getInfoPessoas(idJogo: number){
        return this.httpClient.post<PersonSimplified[]>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoPessoasByEtapa',
            1
        );
    }


}