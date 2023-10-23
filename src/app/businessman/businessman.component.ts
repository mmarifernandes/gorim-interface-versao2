import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { World } from 'src/app/world/world';
import { BusinessmanService } from './businessman.service';
import { PersonSimplified } from '../world/models/person.simplified';
import { Businessman } from './businessman';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';
import { AlertService } from 'src/app/world/alert/alert.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { ChatInfo } from '../world/chat/chat-info';
import { ECGameStatusMessage, GameNotification } from '../world/models/game-notification';
import { GS_FIM_JOGO, GS_JOGADORES_ACABARAM_ETAPA, GS_MESTRE_TERMINOU_ETAPA, GS_TODOS_JOGADORES_NA_ETAPA } from '../world/constants/constants';

@Component({
    selector: 'app-businessman',
    templateUrl: './businessman.component.html',
    styleUrls: ['./businessman.component.scss']
})
export class BusinessmanComponent implements OnInit {

    infoEmp$: Observable<Businessman>;
    idEmp: number;
    emp: Businessman;

    infoMundo$: Observable<World>;
    idJogo: number;

    nomeAgricultores: PersonSimplified[];
    produtos: ProdutoSimplified[] = [];

    liberaBotao: boolean;
    inLineAlertButton: string = 'Nem todos os jogadores começaram o jogo ainda. Aguarde para finalizar a jogada.';
    
    chatInfo: ChatInfo;

    bIsElectionTurn: boolean;

    private notificationSubscription: Subscription;

    private mestreTerminouEtapa: boolean = false;
    private todosTerminaramEtapa: boolean = false;
    etapa: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private empService: BusinessmanService,
        private alertService: AlertService,
        private webStorageService: WebStorageService,
        private wsService: WebSocketService
    ) {
    }

    ngOnInit(): void {
        this.idEmp = this.activatedRoute.snapshot.params.idEmp;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.bIsElectionTurn = false;

        this.liberaBotao = false;

        let etapa: number = 1;
        this.etapa = etapa;
        this.webStorageService.setData(this.idJogo + 'etapa', etapa);

        this.empService.getInfo(this.idJogo, this.idEmp).subscribe(
            (data: Businessman) => {
                if(data != null){
                    this.emp = data;
                    this.infoMundo$ = this.empService.getInfoMundo(this.idJogo);
                    
                    this.chatInfo = {
                        nomePessoa: data.nome,
                        idPessoa: data.id,
                        idJogo: this.idJogo,
                        role: 'empresario',
                        cidade: data.cidade
                    } as ChatInfo;
                    
                    this.webStorageService.setData(
                        this.idJogo + 'papel',
                        JSON.stringify(this.chatInfo)
                    );

                    if(!this.wsService.isConnected()){
                        this.wsService.config(
                            this.emp.nome + this.idJogo,
                            this.emp.nome + this.idEmp
                        );
                        this.wsService.connect();
                    }
                    else {
                        this.wsService.changeConnection(
                            this.emp.nome + this.idJogo,
                            this.emp.nome + this.idEmp
                        );
                    }

                    this.notificationSubscription = this.wsService.sharedNewGameNotification.subscribe(
                        (notification: GameNotification) => {
                            console.log(notification);
                            if(notification != null){
                                this.empService.nextGameNotification(notification);
                                let gameStatus: ECGameStatusMessage = notification.message as ECGameStatusMessage;
                                if(gameStatus.etapa == 1) this.processaGameStatus(gameStatus.status);
                            }
                        }
                    );
                
                    this.empService.verificaTodosComecaramEtapa(this.idJogo, 1).subscribe(
                        (data: number) => {
                            if(data == 0) this.processaGameStatus(GS_TODOS_JOGADORES_NA_ETAPA);
                            else if(data == -2 || data == GS_FIM_JOGO) this.finalizarJogo();
                        },
                        err => console.log(err)
                    );

                    this.arrumaProdutos();
                }
                else this.alertService.warning('Algo deu errado. Por favor, reinicie a página.');
            }
        );

        this.empService.getInfoAgricultores(this.idJogo).subscribe(
            (data: PersonSimplified[]) => {
                if(data != null) this.nomeAgricultores = data;
            },
            err => console.log(err)
        );
    }

    arrumaProdutos(){
        this.emp.produtos.forEach(
            prod => {
                let aux: ProdutoSimplified = {
                    tipo: prod["tipo"],
                    custo: prod["custo"],
                    setor: this.emp.setor
                }
                this.produtos.push(aux);
            }
        );
    }

    isElectionTurn(rodada: number){
        if((rodada-1)%2 == 0 && rodada != 1){
            this.bIsElectionTurn = true;
            return true;
        }
        else return false;
    }

    processaGameStatus(status: number){
        if (status == GS_FIM_JOGO) this.finalizarJogo();
        else if(status == GS_TODOS_JOGADORES_NA_ETAPA) this.alertService.info('Todos entraram na etapa.');
        else if(status == GS_JOGADORES_ACABARAM_ETAPA) this.proximaEtapa();
        else if(status == GS_MESTRE_TERMINOU_ETAPA) this.finalizarJogada();
    }

    shouldLetFinish(finishedByMaster: boolean){
        return (
            (this.bIsElectionTurn && this.webStorageService.hasData(this.idEmp + 'voting')) ||
            !this.bIsElectionTurn ||
            finishedByMaster
        );
    }

    finalizarJogada(){
        this.mestreTerminouEtapa = true;
        this.empService.finalizaJogada(this.idJogo, this.idEmp).subscribe(
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
                'orderProduct' + this.idEmp + 'idOrcamento',
                this.idEmp + 'voting'
            ]);
            this.notificationSubscription.unsubscribe();
            this.alertService.success('Jogada finalizada.', true);

            this.empService.getPapelSegundaEtapa(this.idJogo, this.idEmp).subscribe(
                (idProximaEtapa: number) => {
                    this.alertService.info('A segunta etapa vai começar.');
                    if(idProximaEtapa == 0)
                        this.router.navigate([this.idJogo, 'segundaEtapa', this.idEmp]);
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
    }

    finalizarJogo(){
        this.notificationSubscription.unsubscribe();
        this.alertService.success('Jogo finalizado..', true);
        this.router.navigate([this.idJogo, 'gameover']);
    }
}
