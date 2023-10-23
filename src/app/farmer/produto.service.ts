import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../world/models/produto';
import { SharedDataWrap } from '../world/models/shared-data-wrap';

@Injectable()
export class ProdutoService {
    
    private produto = new BehaviorSubject<SharedDataWrap>(null);
    sharedProdutos = this.produto.asObservable();

    constructor() {}

    nextProduto(produto: Produto) {
        if(produto != null){
            let wrap: SharedDataWrap = {time: Date.now(), data: produto} as SharedDataWrap;
            this.produto.next(wrap);
        }
    }
}