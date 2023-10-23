import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MasterService } from './master.service';
import { World } from '../world/world';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../world/alert/alert.service';
import { ConfirmingModalService } from '../world/confirming-modal/confirming-modal.service';
import { ConfirmingModal } from '../world/confirming-modal/confirming-modal';
import { ResponseModalService } from '../world/confirming-modal/response-modal.service';
import { ChatInfo } from '../world/chat/chat-info';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { ECGameStatusMessage, GameNotification } from '../world/models/game-notification';
import { EC_GAME_STATUS, GS_JOGADORES_ACABARAM_ETAPA, GS_TODOS_JOGADORES_NA_ETAPA } from '../world/constants/constants';

@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit, OnDestroy {

    infoMundo$: Observable<World>;
    mundo: World;
    idJogo: number;

    apareceBotao: boolean = false;

    chatInfo: ChatInfo;
    mestreNome: string = 'Mestre';
    mestreId: number = 0;

    isFinalizarJogoButton: boolean = false;

    private modalSubscription: Subscription;
    private notificationSubscription: Subscription;

    constructor(
        private masterService: MasterService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService,
        private confirmingModalService: ConfirmingModalService,
        private responseModalService: ResponseModalService,
        private wsService: WebSocketService,
        private router: Router
    ) { }

    ngOnInit(){
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.infoMundo$ = this.masterService.getInfoMundo(this.idJogo);
        this.putInMundo();

        this.modalSubscription = this.responseModalService.sharedResponse.subscribe(
            (response: boolean) => {
                if(response != null){
                    if (response){
                        if(this.isFinalizarJogoButton) this.finalizarJogo();
                        this.finalizarEtapa();
                    }
                    else this.isFinalizarJogoButton = false;
                }
            },
            err => console.log(err)
        );
        
        this.wsService.config(
            this.mestreNome + this.idJogo,
            this.mestreNome + this.mestreId
        );
        this.wsService.connect();

        this.notificationSubscription = this.wsService.sharedNewGameNotification.subscribe(
            (notification: GameNotification) => {
                if(notification != null){
                    this.masterService.nextGameNotification(notification);
                    if(notification.code == EC_GAME_STATUS){
                        let gameStatus = notification.message as ECGameStatusMessage;
                        this.processaSituacaoEtapa(gameStatus.status);
                    }
                }
            }
        );

        this.chatInfo = {
            cidade: '',
            idJogo: this.idJogo,
            nomePessoa: this.mestreNome,
            idPessoa: this.mestreId,
            role: 'mestre'
        } as ChatInfo;
    }

    ngOnDestroy(){
        this.modalSubscription.unsubscribe();
        this.notificationSubscription.unsubscribe();
    }

    putInMundo(){
        this.infoMundo$.subscribe(
            (data: World) => {
                this.mundo = data;
            },
            err => console.log(err)
        );
    }
    
    processaSituacaoEtapa(status: number){
        console.log(status);
        if(status == GS_TODOS_JOGADORES_NA_ETAPA){
            this.alertService.info('Todos os jogadores estão na etapa.');
        }
        else if(status == GS_JOGADORES_ACABARAM_ETAPA){
            this.infoMundo$ = this.masterService.getInfoMundo(this.idJogo);
            this.putInMundo();
        }
    }

    openModal(botao: number){
        if (botao === 1) this.isFinalizarJogoButton = true;

        const confirmingModal: ConfirmingModal = {
            modalTitle: (botao === 0) ? 'Encerrar etapa' : 'Finalizar Jogo',
            modalContent: 'Esta ação não pode ser desfeita. Finalizar assim mesmo?',
            modalConfirmBtnText: 'Sim',
            modalCancelBtnText: 'Não'
        };
        this.confirmingModalService.openModal(confirmingModal, 'master-modal');
    }

    finalizarEtapa(){
        this.masterService.finalizarEtapa(this.idJogo, this.mundo.rodada, this.mundo.etapa).subscribe(
            (data: boolean) => {
                if(data){
                    this.alertService.success('Etapa terminada.');
                }
                else this.alertService.danger('Algo deu errado. Etapa não finalizada.');
            },
            err => {
                this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                console.log(err);
            }
        );
    }

    finalizarJogo(){
        this.masterService.finalizarJogo(this.idJogo).subscribe(
            (data: boolean) => {
                if(data){
                    this.alertService.warning('O jogo terminou', true);
                    this.router.navigate([this.idJogo, 'gameover']);
                }
                else this.alertService.danger('Algo deu errado. Tente novamente');
            }
        );
    }
}
