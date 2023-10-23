import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebStorageService } from 'src/app/world/web-storage/webstorage.service';
import { AlertService } from 'src/app/world/alert/alert.service';
import { EnvironmentalAction } from '../mayor';
import { EnvironmentalActionService } from './environmental-action.service';
import { SharedDataWrap } from 'src/app/world/models/shared-data-wrap';

@Component({
    selector: 'app-environmental-action',
    templateUrl: 'environmental-action.component.html',
    styleUrls: [ 'environmental-action.component.scss' ]
})
export class EnvironmentalActionComponent implements OnInit{
    
    @Input() acoesAmbientais: EnvironmentalAction[];
    @Input() idPref: number;

    formChecked = [];
    allOptionsChecked: boolean = false;

    formControl: boolean[] = [false, false, false];
    anyDisabled: boolean = false;

    environmentalActForm: FormGroup;

    private stageStartTime: number = Date.now();

    constructor(
        private acoesAmbService: EnvironmentalActionService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private webStorageService: WebStorageService
    ){ }

    ngOnInit(){
        this.acoesAmbientais.forEach(
            acao => {
                this.formChecked.push({tipo: acao.tipo, id: acao.id, checked: false});
            }
        );

        if(this.webStorageService.hasData('envivonmentalAction' + this.idPref + 'formControl'))
            this.formControl = this.webStorageService.getData('envivonmentalAction' + this.idPref + 'formControl') as boolean[];
        this.webStorageService.setData('envivonmentalAction' + this.idPref + 'formControl', this.formControl);

        if(this.webStorageService.hasData('envivonmentalAction' + this.idPref + 'anyDisabled'))
            this.anyDisabled = this.webStorageService.getData('envivonmentalAction' + this.idPref + 'anyDisabled') as boolean;
        this.webStorageService.setData('envivonmentalAction' + this.idPref + 'anyDisabled', this.anyDisabled);

        this.acoesAmbService.sharedTroca.subscribe(
            (wrap: SharedDataWrap) => {
                if((wrap != null) && (wrap.time > this.stageStartTime) && (wrap.data > -1)){
                    this.formControl[wrap.data] = false;
                    this.webStorageService.setData('envivonmentalAction' + this.idPref + 'formControl', this.formControl);
                    this.anyDisabled = this.atualizaAnyDisabled();
                    this.webStorageService.setData('envivonmentalAction' + this.idPref + 'anyDisabled', this.anyDisabled);
                    this.someComplete();
                }
            },
            err => console.log(err)
        );

        this.formReset();
    }

    atualizaAnyDisabled(){
        let hasDisabled: boolean = false;
        this.formControl.forEach(
            button => {
                if(button == true){
                    hasDisabled = true;
                }
            }
        );
        return hasDisabled;
    }

    formReset(){
        this.environmentalActForm = this.formBuilder.group({
            checked: [false],
            acoesAmbientais: ['', [Validators.required]]
        });
    }

    updateAllComplete() {
        this.allOptionsChecked = this.formChecked != null && this.formChecked.every(acao => acao.checked);
    }
    
    someComplete(): boolean {
        if (this.formChecked)
            return this.formChecked.filter(acao =>  acao.checked).length > 0 && !this.allOptionsChecked;
        return false;
    }
    
    setAll(completed: boolean) {
        this.allOptionsChecked = completed;
        if (this.formChecked) 
            this.formChecked.forEach(acao =>  acao.checked = completed);
    }

    salvarAcaoAmbiental(){
        this.formChecked.forEach(
            acao => {
                if(acao.checked){
                    this.acoesAmbService.nextEnvironmentalAction(acao.id);
                    this.formReset();
                    acao.checked = false;
                    this.formControl[acao.id] = true;
                    this.webStorageService.setData('envivonmentalAction' + this.idPref + 'formControl', this.formControl);
                    this.anyDisabled = true;
                    this.webStorageService.setData('envivonmentalAction' + this.idPref + 'anyDisabled', this.anyDisabled);
                    this.alertService.success('Registrado.');
                }
            }
        );
    }
}