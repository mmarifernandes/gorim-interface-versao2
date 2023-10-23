import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AlertService } from '../world/alert/alert.service';
import { ChatInfo } from '../world/chat/chat-info';
import { EC_GAME_STATUS, EC_SUGESTAO_RESPOSTA, GS_FIM_JOGO, GS_JOGADORES_ACABARAM_ETAPA, GS_MESTRE_TERMINOU_ETAPA, GS_TODOS_JOGADORES_NA_ETAPA } from '../world/constants/constants';
import { ECGameStatusMessage, GameNotification } from '../world/models/game-notification';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { World } from '../world/world';
import { Alderman } from './alderman';
import { AldermanSuggestion } from './alderman-suggestion/alderman-suggestion';
import { AldermanService } from './alderman.service';

@Component({
    selector: 'app-alderman',
    templateUrl: './alderman.component.html',
    styleUrls: [ './alderman.component.scss' ]
})
export class AldermanComponent implements OnInit {
    
    idVer: number;
    idJogo: number;
    
    infoVer: Alderman;
    etapa: number;
    nomeCurto: string;
    infoMundo$: Observable<World>;

    liberaBotao: boolean = false;
    inLineAlertButton: string = 'Nem todos os jogadores começaram o jogo ainda. Aguarde para finalizar a jogada.';

    chatInfo: ChatInfo;

    private notificationSubscription: Subscription;

    private mestreTerminouEtapa: boolean = false;
    private todosTerminaramEtapa: boolean = false;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private verService: AldermanService,
        private alertService: AlertService,
        private webStorageService: WebStorageService,
        private wsService: WebSocketService
    ){ }

    ngOnInit(){
        this.idVer = this.activatedRoute.snapshot.params.idVer;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;

        let etapa: number = 2;
        this.etapa = etapa;
        this.webStorageService.setData(this.idJogo + 'etapa', etapa);

        this.verService.getInfo(this.idJogo, this.idVer).subscribe(
            (data: Alderman) => {
                if(data != null){
                    this.infoMundo$ = this.verService.getInfoMundo(this.idJogo);
                    this.nomeCurto = (data.cidade == 'Atlantis') ? 'VerAT' : 'VerCD';

                    this.wsService.changeConnection((this.nomeCurto + this.idJogo), (this.nomeCurto + this.idVer));

                    this.chatInfo = {
                        nomePessoa: this.nomeCurto,
                        idPessoa: data.id,
                        idJogo: this.idJogo,
                        role: 'vereador',
                        cidade: data.cidade
                    } as ChatInfo;

                    this.notificationSubscription = this.wsService.sharedNewGameNotification.subscribe(
                        (notification: GameNotification) => {
                            if(notification != null){
                                if(notification.code == EC_SUGESTAO_RESPOSTA){
                                    let suggestionResponse: AldermanSuggestion = notification.message as AldermanSuggestion;
                                    this.verService.nextNewSuggestionResponses(suggestionResponse);
                                }
                                else if(notification.code == EC_GAME_STATUS){
                                    let gameStatus: ECGameStatusMessage = notification.message as ECGameStatusMessage;
                                    if (gameStatus.etapa == 2) this.processaGameStatus(gameStatus.status);
                                }
                            }
                        }
                    );

                    this.verService.verificaTodosComecaramEtapa(this.idJogo, 2).subscribe(
                        (data: number) => {
                            if(data == 0) this.processaGameStatus(GS_TODOS_JOGADORES_NA_ETAPA);
                            else if(data == -2 || data == GS_FIM_JOGO) this.finalizarJogo();
                        },
                        err => console.log(err)
                    );

                    this.infoVer = data;
                }
                else this.alertService.warning('Algo deu errado ao carregar os dados, por favor, reinicie a página.');
            },
            err => console.log(err)
        );
    }

    processaGameStatus(status: number){
        if (status == GS_FIM_JOGO) this.finalizarJogo();
        else if(status == GS_TODOS_JOGADORES_NA_ETAPA) this.alertService.info('Todos entraram na etapa.');
        else if(status == GS_MESTRE_TERMINOU_ETAPA) this.finalizaJogada();
        else if(status == GS_JOGADORES_ACABARAM_ETAPA) this.proximaEtapa();
    }

    finalizaJogada(){
        this.mestreTerminouEtapa = true;
        this.verService.finalizaJogada(this.idJogo, this.idVer).subscribe(
            () => {
                if(this.todosTerminaramEtapa) this.proximaEtapa();
            },
            err => {
                console.log(err);
                this.alertService.danger('Algo deu errado. Por favor, fale com o mestre.');
            }
        );
    }

    proximaEtapa(){
        this.todosTerminaramEtapa = true;
        if(this.mestreTerminouEtapa){
            this.mestreTerminouEtapa = false;
            this.webStorageService.removeData(['suggestion' + this.idVer + 'idSugestao']);
                
            this.notificationSubscription.unsubscribe();

            this.alertService.success('Jogada finalizada.', true);

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