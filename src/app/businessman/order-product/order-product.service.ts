import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venda } from 'src/app/farmer/venda/venda';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl + '/request/api';
const EMP_ROUTE = '/empresario';

@Injectable({
    providedIn: 'root'
})
export class OrderProductService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    adicionarOrcamento(
        idJogo: number,
        idOrcamento: number,
        idAgr: number,
        orcamento: Venda
    ){
        orcamento.idOrcamento = idOrcamento;
        return this.httpClient.post(
            API + '/' + idJogo + EMP_ROUTE + '/venda/' + idAgr,
            orcamento
        );
    }
}