import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Venda } from 'src/app/farmer/venda/venda';

const API = environment.ApiUrl + '/request/api';
const AGR_ROUTE = '/agricultor/venda/';
const ADD_ORC_ROUTE = '/empresario/venda/';

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getOrcamentos(
        idJogo: number,
        idAgr: number
    ){
        return this.httpClient.get<Venda[]>(
            API + '/' + idJogo + AGR_ROUTE + idAgr
        );
    }

    adicionaVendaById(
        idJogo: number,
        idEmp: number,
        venda: Venda
    ){
        return this.httpClient.post(
            API + '/' + idJogo + AGR_ROUTE + idEmp,
            venda
        )
    }

    apagarOrcamento(
        idJogo: number,
        idAgr: number,
        orcamento: Venda
    ){
        return this.httpClient.post(
            API + '/' + idJogo + AGR_ROUTE + 'delete/' + orcamento.idEmp + '/' + idAgr,
            orcamento.idOrcamento
        )
    }

    adicionaOverOrcamento(
        idJogo: number,
        idAgr: number,
        orcamento: Venda
    ){
        return this.httpClient.post(
            API + '/' + idJogo + ADD_ORC_ROUTE + idAgr,
            orcamento
        )
    }

}