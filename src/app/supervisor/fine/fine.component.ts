import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebStorageService } from 'src/app/world/web-storage/webstorage.service';
import { AlertService } from 'src/app/world/alert/alert.service';
import { PersonSimplified } from 'src/app/world/models/person.simplified';
import { Fine } from '../postForm';
import { FineService } from './fine.service';

@Component({
    selector: 'app-fine',
    templateUrl: './fine.component.html',
    styleUrls: [ './fine.component.scss' ]
})
export class FineComponent implements OnInit{
    
    @Input() idJogo: number;
    @Input() idFis: number;
    @Input() cidade: string;

    pessoas: PersonSimplified[];

    fineForm: FormGroup;
    pessoasMultadas: number[] = [];

    constructor(
        private fineService: FineService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private webStorageService: WebStorageService
    ){ }

    ngOnInit(){
        this.fineService.getInfoPessoas(this.idJogo, this.cidade).subscribe(
            (data: PersonSimplified[]) => {
                if(data != null) this.pessoas = data;
            },
            err => console.log(err)
        );

        if(this.webStorageService.hasData('fine' + this.idFis + 'pessoasMultadas'))
            this.pessoasMultadas = this.webStorageService.getData('fine' + this.idFis + 'pessoasMultadas') as number[];
        this.webStorageService.setData('fine' + this.idFis + 'pessoasMultadas', this.pessoasMultadas);
        
        this.fineService.sharedDesmultaId.subscribe(
            (data: number) => {
                if(data > -1){
                    this.pessoasMultadas.splice(this.pessoasMultadas.indexOf(data, 1));
                    this.webStorageService.setData('fine' + this.idFis + 'pessoasMultadas', this.pessoasMultadas);
                }
            },
            err => console.log(err)
        );

        this.resetForm();
    }

    resetForm(){
        this.fineForm = this.formBuilder.group({
            idPessoa: ['', [Validators.required]],
            tipo: ['0', [Validators.required]]
        });
    }

    foiMultada(idPessoa: number){
        let foiMultada: boolean = false;
        this.pessoasMultadas.forEach(
            pessoa => {
                if(pessoa == idPessoa) foiMultada = true;
            }
        );
        return foiMultada;
    }

    salvarMulta(){
        if(this.fineForm.valid){
            let newFine: Fine = this.fineForm.getRawValue() as Fine;
            let foiMultada: boolean = this.foiMultada(newFine.idPessoa);
            if(newFine.idPessoa != 0 && !foiMultada){
                this.pessoasMultadas.push(newFine.idPessoa);
                this.webStorageService.setData('fine' + this.idFis + 'pessoasMultadas', this.pessoasMultadas);
                this.fineService.nextFine(newFine);
                this.alertService.success('Multa registrada.');
                this.resetForm();
            }
            else if(foiMultada) this.alertService.warning('Não pode multar duas vezes a mesma pessoa.');
        }
        else this.alertService.warning('Preencha todos os campos do formulário!');
    }

}