import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { AlertService } from '../world/alert/alert.service';
import { World } from '../world/world';
import { WaitingPageService } from './waiting-page.service';
import { LoginLogoutService } from '../world/login-logout/login-logout.service';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { ChatInfo } from '../world/chat/chat-info';
import { ECGameStatusMessage, GameNotification } from '../world/models/game-notification';
import { EC_GAME_STATUS, GS_FIM_JOGO, GS_JOGADORES_ACABARAM_ETAPA, GS_MESTRE_TERMINOU_ETAPA } from '../world/constants/constants';

@Component({
    selector: 'app-waiting-page',
    templateUrl: './waiting-page.component.html',
    styleUrls: [ './waiting-page.component.scss' ]
})
export class WaitingPageComponent implements OnInit {

    infoMundo: World;
    idJogo: number;
    idPessoa: number;

    chatInfo: ChatInfo;

    private mestreTerminouEtapa: boolean = false;
    private todosJogadoresAcabaram: boolean = false;

    private notificationSubscription: Subscription;

    private etapa: number;

    constructor(
        private waitingPageService: WaitingPageService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private webStorageService: WebStorageService,
        private alertService: AlertService,
        private loginLogoutService: LoginLogoutService,
        private wsService: WebSocketService
    ){ }

    ngOnInit(){
        this.idPessoa = this.activatedRoute.snapshot.params.idPessoa;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;

        this.chatInfo = JSON.parse(this.webStorageService.getData(this.idJogo + 'papel')) as ChatInfo;

        this.etapa = this.webStorageService.getData(this.idJogo + 'etapa');
        
        this.mestreTerminouEtapa = false;
        if (this.webStorageService.hasData('hasMasterFinishedStage'))
            this.mestreTerminouEtapa = this.webStorageService.getData('hasMasterFinishedStage');

        console.log('ngOnInit: mestreTerminouEtapa=' + this.mestreTerminouEtapa);

        this.notificationSubscription = this.wsService.sharedNewGameNotification.subscribe(
            (notification: GameNotification) => {
                if(notification != null && notification.code === EC_GAME_STATUS){
                    console.log(notification);
                    let gameStatus: ECGameStatusMessage = notification.message as ECGameStatusMessage;
                    this.processaGameStatus(gameStatus.status, gameStatus.etapa);
                }
            }
        );
        
        this.waitingPageService.verificaTodosTerminaramEtapa(this.idJogo, this.etapa).subscribe(
            (data: number) => {
                console.log('Todos terminaram? ' + data);
                console.log('Mester flag = ' + this.mestreTerminouEtapa);
                if(data == 0) this.processaGameStatus(GS_JOGADORES_ACABARAM_ETAPA, this.etapa);
            },
            err => console.log(err)
        );

        this.waitingPageService.getInfoMundo(this.idJogo).subscribe(
            (data: World) => this.infoMundo = data,
            (err) => console.log(err)
        );
    }

    processaGameStatus(status: number, etapa: number){
        if(status == GS_JOGADORES_ACABARAM_ETAPA) {
            this.todosJogadoresAcabaram = true;
            console.log('todosJogadoresAcabaram=' + this.todosJogadoresAcabaram + '; mestreTerminouEtapa=' + this.mestreTerminouEtapa);
            if(this.mestreTerminouEtapa){
                this.notificationSubscription.unsubscribe();
                this.prosseguirJogo(etapa);
            }
        }
        else if(status == GS_MESTRE_TERMINOU_ETAPA){
            this.mestreTerminouEtapa = true;
            console.log('mestreTerminouEtapa=' + this.mestreTerminouEtapa + '; todosJogadoresAcabaram=' + this.todosJogadoresAcabaram );
            if(this.todosJogadoresAcabaram){
                this.notificationSubscription.unsubscribe();
                this.prosseguirJogo(etapa);
            }
        }
        else if(status == GS_FIM_JOGO){
            this.alertService.warning('O jogo terminou.');
            this.router.navigate([this.idJogo, 'gameover']);
        }
    }

    prosseguirJogo(etapa: number){
        if(this.mestreTerminouEtapa && this.todosJogadoresAcabaram){
            this.mestreTerminouEtapa = false;
            this.todosJogadoresAcabaram = false;
            this.webStorageService.removeData(['hasMasterFinishedStage']);
            if(etapa == 1){
                this.waitingPageService.getPapelSegundaEtapa(this.idJogo, this.chatInfo.idPessoa).subscribe(
                    (idProximaEtapa: number) => {
                        this.alertService.info('A segunta etapa vai começar.');
                        if(idProximaEtapa == 0)
                            this.router.navigate([this.idJogo, 'segundaEtapa', this.chatInfo.idPessoa]);
                        else {
                            let id = Math.floor(idProximaEtapa/10);
                            let papel: string;

                            if(idProximaEtapa%10 == 0) papel = 'fiscalAmbiental';
                            else if(idProximaEtapa%10 == 1) papel = 'prefeito';
                            else papel = 'vereador';

                            this.router.navigate([this.idJogo, papel, id]);
                        }
                    }
                );
            }
            else {
                this.alertService.info('A próxima rodada vai começar.');
                if(etapa == 2){
                    this.loginLogoutService.logout();
                    this.loginLogoutService.login(this.idJogo, this.chatInfo.idPessoa, this.chatInfo.nomePessoa);
                }
                this.router.navigate([this.idJogo, this.chatInfo.role, this.chatInfo.idPessoa]);
            }
        }
    }
}