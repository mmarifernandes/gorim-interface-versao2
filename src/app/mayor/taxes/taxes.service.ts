import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedDataWrap } from 'src/app/world/models/shared-data-wrap';
import { Tax } from '../postForm';

@Injectable({
    providedIn: 'root'
})
export class TaxesService {
    
    private taxes = new BehaviorSubject<SharedDataWrap>(null);
    sharedTaxes = this.taxes.asObservable();

    private tipo = new BehaviorSubject<SharedDataWrap>(null);
    sharedTipo = this.tipo.asObservable();

    constructor(){ }

    nextTaxes(taxes: Tax[]) {
        if((taxes != null) && (taxes.length > 0)){
            let wrap: SharedDataWrap = {time: Date.now(), data: taxes} as SharedDataWrap;
            this.taxes.next(wrap);
        }
    }

    nextTroca(tipo: number){
        if(tipo != null){
            let wrap: SharedDataWrap = {time: Date.now(), data: tipo} as SharedDataWrap;
            this.tipo.next(wrap);
        }
    }
}