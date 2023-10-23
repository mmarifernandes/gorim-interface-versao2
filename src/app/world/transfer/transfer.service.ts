import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PersonSimplified } from '../models/person.simplified';
import { Transfer } from './transfer';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class TransferService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getInfoPessoas(idJogo: number, etapa: number){
        return this.httpClient.post<PersonSimplified[]>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoPessoasByEtapa',
            etapa
        );
    }

    postTransfer(idJogo: number, formData: Transfer){
        return this.httpClient.post(
            API + '/' + idJogo + MASTER_ROUTE + '/adicionaTransferencia',
            formData
        )
    }
}