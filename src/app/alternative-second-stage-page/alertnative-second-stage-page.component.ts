import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ChatInfo } from '../world/chat/chat-info';
import { EC_GAME_STATUS, GS_FIM_JOGO, GS_JOGADORES_ACABARAM_ETAPA, GS_MESTRE_TERMINOU_ETAPA } from '../world/constants/constants';
import { ECGameStatusMessage, GameNotification } from '../world/models/game-notification';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { World } from '../world/world';

import { AlternativeSecondStagePageService } from './alertnative-second-stage-page.service';

@Component({
    selector: 'app-alertnative-page',
    templateUrl: './alertnative-second-stage-page.component.html',
    styleUrls: [ './alertnative-second-stage-page.component.scss' ]
})
export class AlternativeSecondStagePageComponent implements OnInit {

    idJogo: number;
    idPessoa: number;
    chatInfo: ChatInfo = null;

    mundo$: Observable<World>;

    private hasMasterFinishedStage: boolean = false;
    private hasEveryoneFinishedStage: boolean = false;

    private notificationSubscription: Subscription;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private alternativePageService: AlternativeSecondStagePageService,
        private webStorageService: WebStorageService,
        private wsService: WebSocketService
    ){ }

    ngOnInit(){
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.idPessoa = this.activatedRoute.snapshot.params.idPessoa;
        
        let info = JSON.parse(this.webStorageService.getData(this.idJogo + 'papel')) as ChatInfo;
        if(!this.wsService.isConnected()){
            this.wsService.config(
                info.nomePessoa + this.idJogo,
                info.nomePessoa + info.idPessoa
            );
            this.wsService.connect();
        }
        else {
            this.wsService.changeConnection(
                info.nomePessoa + this.idJogo,
                info.nomePessoa + info.idPessoa
            );
        }
        this.chatInfo = info;

        this.notificationSubscription = this.wsService.sharedNewGameNotification.subscribe(
            (notification: GameNotification) => {
                if(notification != null && notification.code == EC_GAME_STATUS){
                    let gameStatus: ECGameStatusMessage = notification.message as ECGameStatusMessage;
                    this.processaGameStatus(gameStatus.status);
                }
            }
        );

        if(this.webStorageService.hasData('hasMasterFinishedStage'))
            this.hasMasterFinishedStage = this.webStorageService.getData('hasMasterFinishedStage');

        if(this.webStorageService.hasData('hasEveryoneFinishedStage'))
            this.hasEveryoneFinishedStage = this.webStorageService.getData('hasEveryoneFinishedStage');
        
        if(this.hasMasterFinishedStage && this.hasEveryoneFinishedStage) this.finalizaEtapa();
            
        this.mundo$ = this.alternativePageService.getInfoMundo(this.idJogo);
    }

    processaGameStatus(status: number){
        if(status == GS_FIM_JOGO){
            this.router.navigate([this.idJogo, 'gameover']);
            this.notificationSubscription.unsubscribe()
        }
        else if(status == GS_MESTRE_TERMINOU_ETAPA){
            this.hasMasterFinishedStage = true;
            this.webStorageService.setData('hasMasterFinishedStage', true);

            if(this.hasEveryoneFinishedStage) this.finalizaEtapa();
        }
        else if(status == GS_JOGADORES_ACABARAM_ETAPA){
            this.hasEveryoneFinishedStage = true;
            this.webStorageService.setData('hasEveryoneFinishedStage', true);

            if(this.hasMasterFinishedStage) this.finalizaEtapa();
        }
    }

    finalizaEtapa(){
        this.webStorageService.removeData(['hasMasterFinishedStage', 'hasEveryoneFinishedStage']);
        this.notificationSubscription.unsubscribe();
        this.router.navigate([this.idJogo, this.chatInfo.role, this.idPessoa]);
    }
    
}