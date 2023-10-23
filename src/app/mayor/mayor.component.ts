import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { WebStorageService } from '../world/web-storage/webstorage.service';
import { AlertService } from '../world/alert/alert.service';
import { World } from '../world/world';
import { EnvironmentalActionService } from './environmental-action/environmental-action.service';
import { Mayor } from './mayor';
import { MayorService } from './mayor.service';
import { PostForm, Tax } from './postForm';
import { TaxesService } from './taxes/taxes.service';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { ChatInfo } from '../world/chat/chat-info';
import { ECGameStatusMessage, GameNotification } from '../world/models/game-notification';
import { EC_GAME_STATUS, EC_SUGESTAO, GS_FIM_JOGO, GS_JOGADORES_ACABARAM_ETAPA, GS_MESTRE_TERMINOU_ETAPA, GS_TODOS_JOGADORES_NA_ETAPA } from '../world/constants/constants';
import { AldermanSuggestion } from '../alderman/alderman-suggestion/alderman-suggestion';
import { SharedDataWrap } from '../world/models/shared-data-wrap';

@Component({
    selector: 'app-mayor',
    templateUrl: './mayor.component.html',
    styleUrls: [ './mayor.component.scss' ]
})
export class MayorComponent implements OnInit {
    
    idPref: number;
    idJogo: number;
    etapa: number;

    infoPref: Mayor;
    nomeCurto: string;
    infoMundo$: Observable<World>;

    environmentalActions: number[] = [];
    taxes: Tax[] = [];

    liberaBotao: boolean = false;
    inLineAlertButton: string = 'Nem todos os jogadores começaram o jogo ainda. Aguarde para finalizar a jogada.';

    chatInfo: ChatInfo;

    private actionsSubscription: Subscription;
    private taxesSubscription: Subscription;
    private notificationSubscription: Subscription;

    private mestreTerminouEtapa: boolean = false;
    private todosTerminaramEtapa: boolean = false;

    private stageStartTime: number = Date.now();

    constructor(
        private prefService: MayorService,
        private activatedRoute: ActivatedRoute,
        private webStorageService: WebStorageService,
        private alertService: AlertService,
        private environmentalActService: EnvironmentalActionService,
        private taxesService: TaxesService,
        private router: Router,
        private wsService: WebSocketService
    ){ }

    ngOnInit(){
        this.idPref = this.activatedRoute.snapshot.params.idPref;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;

        this.infoMundo$ = this.prefService.getInfoMundo(this.idJogo);

        let etapa: number = 2;
        this.etapa = etapa;
        this.webStorageService.setData(this.idJogo + 'etapa', etapa);

        this.prefService.getInfo(this.idJogo, this.idPref).subscribe(
            (data: Mayor) => {
                this.nomeCurto = (data.cidade == 'Atlantis') ? 'PrefAT' : 'PrefCD';

                this.wsService.changeConnection((this.nomeCurto + this.idJogo), (this.nomeCurto + this.idPref));

                this.chatInfo = {
                    nomePessoa: this.nomeCurto,
                    idPessoa: data.id,
                    idJogo: this.idJogo,
                    role: 'prefeito',
                    cidade: data.cidade
                } as ChatInfo;

                this.notificationSubscription = this.wsService.sharedNewGameNotification.subscribe(
                    (notification: GameNotification) => {
                        if(notification != null){
                            if(notification.code == EC_SUGESTAO){
                                let newSuggestion: AldermanSuggestion = notification.message as AldermanSuggestion;
                                this.prefService.nextSuggestion(newSuggestion);
                            }
                            else if(notification.code == EC_GAME_STATUS){
                                let gameStatus: ECGameStatusMessage = notification.message as ECGameStatusMessage;
                                if (gameStatus.etapa == 2) this.processaGameStatus(gameStatus.status);
                            }
                        }
                    }
                );
                    
                this.prefService.verificaTodosComecaramEtapa(this.idJogo, 2).subscribe(
                    (data: number) => {
                        if(data == 0) this.processaGameStatus(GS_TODOS_JOGADORES_NA_ETAPA);
                        else if(data == -2 || data == GS_FIM_JOGO) this.finalizarJogo();
                    },
                    err => console.log(err)
                );
                
                this.infoPref = data;
            },
            err => console.log(err)
        );

        if(this.webStorageService.hasData('pref'+ this.idPref + 'environmentalActions'))
            this.environmentalActions = this.webStorageService.getData('pref'+ this.idPref + 'environmentalActions') as number[];
        this.webStorageService.setData('pref'+ this.idPref + 'environmentalActions', this.environmentalActions);

        this.actionsSubscription = this.environmentalActService.sharedEnvironmentalAction.subscribe(
            (wrap: SharedDataWrap) => {
                if((wrap != null) && (wrap.time > this.stageStartTime) && (wrap.data > -1)){
                    this.environmentalActions.push(wrap.data);
                    this.webStorageService.setData('pref'+ this.idPref + 'environmentalActions', this.environmentalActions);
                }
            },
            err => console.log(err)
        );

        if(this.webStorageService.hasData('pref'+ this.idPref + 'taxes'))
            this.taxes = this.webStorageService.getData('pref'+ this.idPref + 'taxes') as Tax[];
        this.webStorageService.setData('pref'+ this.idPref + 'taxes', this.taxes);

        this.taxesSubscription = this.taxesService.sharedTaxes.subscribe(
            (wrap: SharedDataWrap) => {
                if((wrap != null) && (wrap.time > this.stageStartTime)){
                    let taxes: Tax[] = wrap.data as Tax[];
                    taxes.forEach(
                        (data: Tax) =>{
                            if(data.tipo > -1){
                                this.taxes.push(data);
                                this.webStorageService.setData('pref'+ this.idPref + 'taxes', this.taxes);
                            }
                        }
                    );
                }
            },
            err => console.log(err)
        );
    }

    removeAction(acao: number){
        this.environmentalActions.splice(this.environmentalActions.indexOf(acao), 1);
        this.alertService.success('Removido.');
        this.environmentalActService.nextTroca(acao);
        this.webStorageService.setData('pref'+ this.idPref + 'environmentalActions', this.environmentalActions);
    }

    removeTax(tax: Tax){
        this.taxes.splice(this.taxes.indexOf(tax), 1);
        this.alertService.success('Removido.');
        this.taxesService.nextTroca(tax.tipo);
        this.webStorageService.setData('pref'+ this.idPref + 'taxes', this.taxes);
    }

    processaGameStatus(status: number){
        if (status == GS_FIM_JOGO) this.finalizarJogo();
        else if(status == GS_TODOS_JOGADORES_NA_ETAPA) this.alertService.info('Todos entraram na etapa.');
        else if(status == GS_MESTRE_TERMINOU_ETAPA) this.finalizarJogada();
        else if(status == GS_JOGADORES_ACABARAM_ETAPA) this.proximaEtapa();
    }

    finalizarJogada(){
        this.mestreTerminouEtapa = true;
        this.prefService.finalizaJogada(
            this.idJogo,
            this.idPref,
            {
                impostos: this.taxes,
                idAcoesAmbientais: this.environmentalActions
            } as PostForm
        ).subscribe(
            () => {
                if(this.todosTerminaramEtapa) this.proximaEtapa();
            },
            err => {
                console.log(err);
                this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
            }
        );
    }

    proximaEtapa(){
        this.todosTerminaramEtapa = true;
        if(this.mestreTerminouEtapa){
            this.mestreTerminouEtapa = false;
            this.webStorageService.removeData([
                'envivonmentalAction' + this.idPref + 'formControl',
                'envivonmentalAction' + this.idPref + 'anyDisabled',
                'taxes' + this.idPref + 'formControl',
                'pref'+ this.idPref + 'environmentalActions',
                'pref'+ this.idPref + 'taxes'
            ]);
            this.actionsSubscription.unsubscribe();
            this.taxesSubscription.unsubscribe();
            this.notificationSubscription.unsubscribe();

            this.alertService.success('Jogada finalizada.', true);
            //this.router.navigate([this.idJogo, 'waitingPage', this.idVer]);

            let infoFirstStage: ChatInfo = JSON.parse(this.webStorageService.getData(this.idJogo + 'papel')) as ChatInfo;
            this.router.navigate([this.idJogo, infoFirstStage.role, infoFirstStage.idPessoa]);
        }
    }

    finalizarJogo(){
        this.alertService.warning('O jogo terminou', true);
                
        this.notificationSubscription.unsubscribe();
        this.router.navigate([this.idJogo, 'gameover']);
    }
}