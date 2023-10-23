import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/world/alert/alert.service';
import { LoginLogoutService } from 'src/app/world/login-logout/login-logout.service';
import { LoginBodyResponse } from 'src/app/world/login-logout/loginBodyResponse';
import { PersonSimplified } from 'src/app/world/models/person.simplified';
import { WebStorageService } from 'src/app/world/web-storage/webstorage.service';
import { JoinService } from './join.service';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: [ './join.component.scss' ]
})
export class JoinComponent implements OnInit{
    
    jogoForm: FormGroup;
    joinForm: FormGroup;
    status: boolean = false;
    showPessoas: boolean = false;
    pessoas: PersonSimplified[];
    mundos: any[];
    idJogo: number;
    selectedId?: number;
    constructor(
        private joinService: JoinService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private router: Router,
        private webStorageService: WebStorageService,
        private loginLogoutService: LoginLogoutService
    ){ }

    ngOnInit(){

        this.joinService.getListaMundos().subscribe(
            (value)=>{ 
              console.log(value);         
              this.mundos=value;        
             },
            (error)=> console.log(error))
       
        // console.log(this.mundos)

        this.jogoForm = this.formBuilder.group({
            idJogo: ['', [Validators.required]]
        });
        this.joinForm = this.formBuilder.group({
            personagem: ['', Validators.required]
        });
    }

    getInfoPessoas(){
        let idJogo = this.jogoForm.get('idJogo').value;
        if(!isNaN(idJogo) && idJogo != null){
            this.joinService.getInfoPessoas(this.jogoForm.get('idJogo').value).subscribe(
                (data: PersonSimplified[]) => {
                    if(data != null){
                        this.pessoas = data;
                        this.showPessoas = true;
                        this.idJogo = idJogo;
                    }
                    else {
                        this.alertService.warning('O ID inserido não existe. Verifique e tente novamente.');
                    }
                },
                err => {
                    console.log(err);
                    this.alertService.danger('Servidor indisponível. Tente novamente mais tarde.');
                }
            );
        }
    }

    onSelect(IdJogo): void {
      this.selectedId = IdJogo;
    }
    getInfoPessoasRoom(IdJogo){
        // this.status = !this.status;
        let idJogo = IdJogo;
        console.log(idJogo)
        if(!isNaN(idJogo) && idJogo != null){
            this.joinService.getInfoPessoas(idJogo).subscribe(
                (data: PersonSimplified[]) => {
                    if(data != null){
                        this.pessoas = data;
                        this.showPessoas = true;
                        this.idJogo = idJogo;
                    }
                    else {
                        this.alertService.warning('O ID inserido não existe. Verifique e tente novamente.');
                    }
                },
                err => {
                    console.log(err);
                    this.alertService.danger('Servidor indisponível. Tente novamente mais tarde.');
                }
            );
        }
    }

    joinGame(){
        if(this.joinForm.valid){
            let idPessoa: number = this.joinForm.get('personagem').value as number;
            let role: string;
            
            if(idPessoa < 5) role = 'empresario';
            else role = 'agricultor';
            
            this.loginLogoutService.login(this.idJogo, idPessoa, this.pessoas[idPessoa-1].nome).subscribe(
                (data: LoginBodyResponse) => {
                    if(data != null){
                        this.webStorageService.setData('authToken', data.token);
                        this.router.navigate([this.idJogo, role, idPessoa]);//, { replaceUrl: true });
                    }
                    else this.alertService.warning('Tente novamente com outro id');
                },
                err => {
                    console.log(err);
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                }
            );
        }
        else this.alertService.warning('Escolha o seu personagem!');
    }

}