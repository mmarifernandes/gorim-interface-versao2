import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Venda } from 'src/app/farmer/venda/venda';
import { AlertService } from 'src/app/world/alert/alert.service';
import { EC_ORCAMENTO_RESPOSTA } from 'src/app/world/constants/constants';
import { GameNotification } from 'src/app/world/models/game-notification';
import { BusinessmanService } from '../businessman.service';

import { VendaService } from './venda.service';

@Component({
    selector: 'app-vendacard',
    templateUrl: './venda.component.html',
    styleUrls: [ './venda.component.scss' ]
})
export class VendaComponent implements OnInit, OnDestroy{
    
    @Input() idJogo: number;
    @Input() idEmp: number;

    quantidadeOrcamentos: number = 0;
    orcamentos: Venda[] = [];

    private notificationSubscription: Subscription;

    constructor(
        private vendaService: VendaService,
        private alertService: AlertService,
        private empService: BusinessmanService
    ){ }

    ngOnInit(){
        this.vendaService.getVendas(this.idJogo, this.idEmp).subscribe(
            (data: Venda[]) => {
                if(data != null){
                    if(this.quantidadeOrcamentos < data.length){
                        this.quantidadeOrcamentos = data.length;
                        this.alertService.info('Você tem novas respostas de agricultores');
                    }
                    this.orcamentos = data;
                }
            }
        );

        this.notificationSubscription = this.empService.sharedGameNotification.subscribe(
            (notification: GameNotification) => { 
                if(notification != null) {
                    if(notification.code == EC_ORCAMENTO_RESPOSTA){
                        let newOrcamento: Venda = notification.message as Venda;
                        this.orcamentos.push(newOrcamento);
                        this.alertService.info('Novo orçamento respondido!');
                    }
                }
            }
        );
    }

    ngOnDestroy(){
        this.notificationSubscription.unsubscribe();
    }

    getColour(sucesso: boolean){
        if(sucesso) return 'vendaSucesso';
        else return 'vendaFalha';
    }
}