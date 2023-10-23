import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedDataWrap } from 'src/app/world/models/shared-data-wrap';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentalActionService {
    
    private environmentalAction = new BehaviorSubject<SharedDataWrap>(null);
    sharedEnvironmentalAction = this.environmentalAction.asObservable();

    private troca = new BehaviorSubject<SharedDataWrap>(null);
    sharedTroca = this.troca.asObservable();

    constructor(){ }

    nextEnvironmentalAction(environmentalAction: number) {
        if(environmentalAction != null){
            let wrap: SharedDataWrap = {time: Date.now(), data: environmentalAction} as SharedDataWrap;
            this.environmentalAction.next(wrap);
        }
    }

    nextTroca(troca: number){
        if(troca != null){
            let wrap: SharedDataWrap = {time: Date.now(), data: troca} as SharedDataWrap;
            this.troca.next(wrap);
        }
    }
}