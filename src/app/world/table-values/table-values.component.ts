import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableValuesService } from './table-values.service';

@Component({
    selector: 'app-table-values',
    templateUrl: './table-values.component.html',
    styleUrls: [ './table-values.component.scss' ]
})
export class TableValuesComponent implements OnInit{
    @Input() role: string;
    @Input() tipoEmpresario: string = "";
    @Input() cidade: string = "";
    
    idJogo: number;

    classePessoa: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private tableValuesService: TableValuesService
    ){ }

    ngOnInit(){
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.classePessoa = this.getClassePessoa();
    }

    isFromAtlantis() {
        return (this.cidade == "Atlantis") ? true : false;
    }

    isFromCidadela() {
        return (this.cidade == "Cidadela") ? true : false;
    }

    isAgricultor(){
        return (this.role == "agricultor") ? true : false;
    }

    isEmpresario(){
        return (this.role == "empresario") ? true : false;
    }

    isSemente(){
        return (this.tipoEmpresario == "semente") ? true : false;
    }

    isFertilizante(){
        return (this.tipoEmpresario == "fertilizante") ? true : false;
    }

    isMaquina(){
        return (this.tipoEmpresario == "máquina") ? true : false;
    }

    isAgrotoxico(){
        return (this.tipoEmpresario == "agrotóxico") ? true : false;
    }

    isFiscal(){
        return (this.role == "fiscalAmbiental") ? true : false;
    }

    isPrefeito(){
        return (this.role == "prefeito") ? true : false;
    }

    isVereador(){
        return (this.role == "vereador") ? true : false;
    }

    getClassePessoa(){
        switch(this.role){
            case 'empresario':
                return 1;
            case 'agricultor':
                return 2;
            case 'fiscalAmbiental':
                return 3;
            case 'prefeito':
                return 4;
            case 'vereador':
                return 5;
            default:
                return 0;
        }
    }
}