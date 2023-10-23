import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResponseModalService {
    private response = new BehaviorSubject<boolean>(null);
    sharedResponse = this.response.asObservable();

    constructor(){ }

    nextResponse(response: boolean) {
        this.response.next(response);
    }
}