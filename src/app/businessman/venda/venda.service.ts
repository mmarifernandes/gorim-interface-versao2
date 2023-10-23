import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Venda } from 'src/app/farmer/venda/venda';

const API = environment.ApiUrl + '/request/api';
const EMP_ROUTE = '/empresario';

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getVendas(
        idJogo: number,
        idEmp: number
    ){
        return this.httpClient.get<Venda[]>(
            API + '/' + idJogo + EMP_ROUTE + '/venda/' + idEmp
        );
    }

}