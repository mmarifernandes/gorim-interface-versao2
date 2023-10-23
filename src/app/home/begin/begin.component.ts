import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/world/alert/alert.service';
import { LoginLogoutService } from 'src/app/world/login-logout/login-logout.service';
import { LoginBodyResponse } from 'src/app/world/login-logout/loginBodyResponse';
import { WebStorageService } from 'src/app/world/web-storage/webstorage.service';

import { BeginService } from './begin.service';

@Component({
    selector: 'app-begin',
    templateUrl: './begin.component.html',
    styleUrls: [ './begin.component.scss' ]
})
export class BeginComponent implements OnInit{

    beginForm: FormGroup;
    beginFormButtonDisabled: boolean = false;

    shouldShowMessage: boolean = false;
    messageType: String;
    mundos: any[];
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private beginService: BeginService,
        private alertService: AlertService,
        private weStorageService: WebStorageService,
        private loginLogoutService: LoginLogoutService
    ){ }

    ngOnInit(): void {
       
    
        // console.log(this.beginService.getListaMundos().subscribe(val => console.log(val)))
        this.beginForm = this.formBuilder.group({
            quantidadeJogadores: [
                '', [
                    Validators.required,
                    Validators.min(6)
                ]
            ]
        });
    }
    

    showMessage(){
        this.messageType = 'info';
        this.shouldShowMessage = true;
    }

    

    comecarJogo(){
        if(this.beginForm.valid){
            const quantidadeJogadores: number = this.beginForm.get('quantidadeJogadores').value;
            this.beginFormButtonDisabled = true;
            this.shouldShowMessage = false;
            this.beginService.iniciaJogada(quantidadeJogadores).subscribe(
                (data: number) => {
                    const idJogo = data;
                    if(idJogo > 0){
                        this.loginLogoutService.login(idJogo, 0, 'mestre').subscribe(
                            (data: LoginBodyResponse) => {
                                this.weStorageService.setData('authToken', data.token);
                                this.router.navigate([idJogo, 'mestre'], { replaceUrl: true });
                            },
                            err => console.log(err)
                        );
                    }
                    else {
                        this.beginForm.reset();
                        this.alertService.danger('Não foi possível criar um Mundo novo. Por favor, tente novamente.');
                        this.beginFormButtonDisabled = false;
                    }
                },
                err => {
                    console.log(err);
                    this.beginForm.reset();
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                    this.beginFormButtonDisabled = false;
                }
            );
        }
        else {
            this.messageType = 'danger';
        }
    }
}