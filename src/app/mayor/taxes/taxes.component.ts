import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebStorageService } from 'src/app/world/web-storage/webstorage.service';
import { AlertService } from 'src/app/world/alert/alert.service';
import { Tax } from '../postForm';
import { TaxesService } from './taxes.service';
import { SharedDataWrap } from 'src/app/world/models/shared-data-wrap';

@Component({
    selector: 'app-taxes',
    templateUrl: './taxes.component.html',
    styleUrls: [ './taxes.component.scss' ]
})
export class TaxesComponent implements OnInit {
    
    @Input() taxas: number[];
    @Input() idPref: number;
    
    taxesForm: FormGroup;
    formControl: boolean[] = [false, false, false];

    private stageStartTime: number = Date.now();

    constructor(
        private taxesService: TaxesService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private webStorageService: WebStorageService
    ){ }

    ngOnInit(){
        if(this.webStorageService.hasData('taxes' + this.idPref + 'formControl'))
            this.formControl = this.webStorageService.getData('taxes' + this.idPref + 'formControl') as boolean[];
        this.webStorageService.setData('taxes' + this.idPref + 'formControl', this.formControl);

        this.taxesService.sharedTipo.subscribe(
            (wrap: SharedDataWrap) => {
                if((wrap != null) && (wrap.time) && (wrap.data > -1)){
                    let tax: number = wrap.data as number;
                    this.formControl[tax-1] = false;
                    this.webStorageService.setData('taxes' + this.idPref + 'formControl', this.formControl);
                }
            },
            err => console.log(err)
        );
        this.formReset();
    }

    formReset(){
        this.taxesForm = this.formBuilder.group({
            tipo1: ['none', [Validators.required]],
            tipo2: ['none', [Validators.required]],
            tipo3: ['none', [Validators.required]]
        });
    }

    getValorChar(taxa: number, tipo: number){
        if(tipo == 1){
            if(taxa == 10) return 'M';
            else if(taxa < 10) return 'B';
            else return 'A';
        }
        else if(tipo == 2){
            if(taxa == 0.1) return 'M';
            else if(taxa < 0.1) return 'B';
            else return 'A';
        }
        else {
            if(taxa == 0.3) return 'M';
            else if(taxa < 0.3) return 'B';
            else return 'A';
        }
    }

    salvarTaxes(){
        let newTaxes: Tax[] = [];

        if(this.taxesForm.get('tipo1').value != 'none'){
            newTaxes.push({tipo: 1, taxa: this.taxesForm.get('tipo1').value});
            this.formControl[0] = true;
        }

        if(this.taxesForm.get('tipo2').value != 'none'){
            newTaxes.push({tipo: 2, taxa: this.taxesForm.get('tipo2').value});
            this.formControl[1] = true;
        }
            
        if(this.taxesForm.get('tipo3').value != 'none'){
            newTaxes.push({tipo: 3, taxa: this.taxesForm.get('tipo3').value});
            this.formControl[2] = true;
        }
        
        if(newTaxes.length !=0){
            this.taxesService.nextTaxes(newTaxes);
            this.webStorageService.setData('taxes' + this.idPref + 'formControl', this.formControl);
            this.alertService.success('Registrado.');
            this.formReset();
        }
    }
}