import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonSimplified } from 'src/app/world/models/person.simplified';
import { SharedDataWrap } from 'src/app/world/models/shared-data-wrap';
import { environment } from 'src/environments/environment';
import { Fine } from '../postForm';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class FineService{

    private fine = new BehaviorSubject<SharedDataWrap>(null);
    sharedFines = this.fine.asObservable();

    private desmultaId = new BehaviorSubject<number>(0);
    sharedDesmultaId = this.desmultaId.asObservable();

    constructor(
        private httpClient: HttpClient
    ){ }

    nextFine(fine: Fine) {
        if(fine != null){
            let wrap: SharedDataWrap = {time: Date.now(), data: fine} as SharedDataWrap;
            this.fine.next(wrap);
        }
    }

    nextDesmultaId(idPessoa: number){
        this.desmultaId.next(idPessoa);
    }

    getInfoPessoas(idJogo: number, cidade: string){
        return this.httpClient.get<PersonSimplified[]>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoPessoasForFining/' + cidade
        );
    }

}