import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert/alert.service';

import { PersonSimplified } from '../models/person.simplified';
import { Transfer } from './transfer';
import { TransferService } from './transfer.service';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

    @Input() idJogo: number;
    @Input() idPessoa: number;
    @Input() etapa: number;
    pessoas: PersonSimplified[];
    
    transferForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private transferService: TransferService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.transferService.getInfoPessoas(this.idJogo, this.etapa).subscribe(
            (data: PersonSimplified[]) => {
                if(data != null) this.pessoas = data;
            },
            err => console.log(err)
        );
        this.restartaForm()
    }

    restartaForm(){
        this.transferForm = this.formBuilder.group({
            destinatario: ['', Validators.required],
            quantia: ['', [Validators.required]],
            remetente: [this.idPessoa]
        });
    }

    submitTransferForm(){
        if (this.transferForm.valid){
            let formData = this.transferForm.getRawValue() as Transfer;
            let aux = formData.quantia.toString();
            if(aux.includes(',')) aux = aux.replace(',', '.');
            formData.quantia = aux as unknown as number;
            this.transferService.postTransfer(this.idJogo, formData)
                .subscribe(
                    (data: boolean) => {
                        if(data){
                            this.alertService.success('Transferência enviada.');
                            this.restartaForm();
                        }
                        else {
                            this.alertService.warning('Transferência não enviada. Tente novamente.');
                            this.restartaForm();
                        }
                    },
                    err => {
                        this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                        console.log(err);
                    }
                );
        }
        else this.alertService.warning('Esqueceu de algum campo do formulário em branco?');
    }

}
