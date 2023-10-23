import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/world/alert/alert.service';
import { PersonSimplified } from 'src/app/world/models/person.simplified';
import { GreenSeal } from '../postForm';
import { GreenSealService } from './green-seal.service';

@Component({
    selector: 'app-green-seal',
    templateUrl: './green-seal.component.html',
    styleUrls: [ './green-seal.component.scss' ]
})
export class GreenSealComponent implements OnInit{
    
    @Input() idJogo: number;
    @Input() idFis: number;
    @Input() cidade: string;

    agricultores: PersonSimplified[];

    greenSealForm: FormGroup;

    parcelas = [
        {nome: "P1", checked: false},
        {nome: "P2", checked: false},
        {nome: "P3", checked: false},
        {nome: "P4", checked: false},
        {nome: "P5", checked: false},
        {nome: "P6", checked: false}
    ];
    allParcelsMarked: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private greenSealService: GreenSealService,
        private alertSerice: AlertService
    ){ }

    ngOnInit(){
        this.greenSealService.getInfoAgricultores(this.idJogo, this.cidade).subscribe(
            (data: PersonSimplified[]) => {
                if(data != null) this.agricultores = data;
            },
            err => console.log(err)
        );
        this.resetForm();
    }

    resetForm(){
        this.greenSealForm = this.formBuilder.group({
            idAgr: [0, [Validators.required]],
            atribuir: ['true', [Validators.required]],
            parcelas: ['', [Validators.required]],
            checked: [false]
        });
    }

    updateAllComplete() {
        this.allParcelsMarked = this.parcelas != null && this.parcelas.every(parcela => parcela.checked);
    }
    
    someComplete(): boolean {
        if (this.parcelas)
            return this.parcelas.filter(parcela =>  parcela.checked).length > 0 && !this.allParcelsMarked;
        return false;
    }
    
    setAll(completed: boolean) {
        this.allParcelsMarked = completed;
        if (this.parcelas)
            this.parcelas.forEach(parcela =>  parcela.checked = completed);
    }

    salvarGreenSeal(){
        if (this.greenSealForm.valid){
            let idAgr = this.greenSealForm.get('idAgr').value;
            
            let parcelas = [];
            let i = 1;
            this.parcelas.forEach(
                parcela => {
                    if(parcela.checked){
                        parcelas.push(i);
                        parcela.checked = false;
                    }
                    i++;
                }
            );

            if(idAgr != 0 && parcelas.length > 0){
                this.greenSealService.nextGreenSeal({
                    idAgr: idAgr,
                    atribuir: this.greenSealForm.get('atribuir').value as boolean,
                    parcelas: parcelas
                } as GreenSeal);
                this.alertSerice.success('Registrado.');
                this.resetForm();
            }
        }
        else this.alertSerice.warning('Preencha todos os campos do formulário!');
    }
}