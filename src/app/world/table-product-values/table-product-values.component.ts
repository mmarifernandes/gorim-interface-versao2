import { Component, OnInit, Input } from '@angular/core';
import { ProdutoSimplified } from '../models/produto.simplified';

@Component({
    selector: 'app-table-product-values',
    templateUrl: './table-product-values.component.html',
    styleUrls: ['./table-product-values.component.scss']
})
export class TableProductValuesComponent implements OnInit {

    @Input() role: string;
    @Input() produtos: ProdutoSimplified[];

    sementes: ProdutoSimplified[] = [];
    fertilizantes: ProdutoSimplified[] = [];
    maquinas: ProdutoSimplified[] = [];
    agrotoxicos: ProdutoSimplified[] = [];

    constructor() { }

    ngOnInit(): void {
        this.produtos.forEach(
            (prod: ProdutoSimplified) => {
                if(prod.setor == "semente") this.sementes.push(prod)
                else if(prod.setor == "fertilizante") this.fertilizantes.push(prod);
                else if(prod.setor == "máquina") this.maquinas.push(prod);
                else if(prod.setor == "agrotóxico") this.agrotoxicos.push(prod);
            }
        );
    }

}
