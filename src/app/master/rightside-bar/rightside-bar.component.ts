import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EC_GAME_STATUS, EC_PESSOA_COMECOU_JOGADA, EC_PESSOA_FINALIZOU_JOGADA, GS_JOGADORES_ACABARAM_ETAPA, GS_MESTRE_TERMINOU_ETAPA } from 'src/app/world/constants/constants';
import { ECGameStatusMessage, ECPessoaComecouJogadaInterface, ECPessoaFinalizouJogadaInterface, GameNotification } from 'src/app/world/models/game-notification';
import { PersonSimplified } from 'src/app/world/models/person.simplified';
import { MasterService } from '../master.service';

@Component({
    selector: 'app-rightsidebar',
    templateUrl: './rightside-bar.component.html',
    styleUrls: [ './rightside-bar.component.scss' ]
})
export class RightSideBarComponent implements OnInit, OnDestroy {
    @Input() idJogo: number;
    @Input() etapa: number;
    @Input() quantidadeJogadores: number;

    finalizadosEtapa: number[] = [];
    pessoas: PersonSimplified[] = [];

    private notificationSubscription: Subscription;

    constructor(
        private masterService: MasterService
    ){ }

    ngOnInit(){
        this.getInfoPessoas();
        this.masterService.verificaFinalizados(this.idJogo, this.etapa).subscribe(
            (data: number[]) => this.finalizadosEtapa = data
        );

        this.notificationSubscription = this.masterService.sharedGameNotification.subscribe(
            (gameNotification: GameNotification) => {
                if(gameNotification != null){
                    if(gameNotification.code == EC_GAME_STATUS){
                        let notificationMessage: ECGameStatusMessage = gameNotification.message as ECGameStatusMessage;
                        if(notificationMessage.status == GS_JOGADORES_ACABARAM_ETAPA) this.getInfoPessoas();
                    }
                    else if(gameNotification.code == EC_PESSOA_COMECOU_JOGADA){
                        let pessoComecouEtapa: ECPessoaComecouJogadaInterface = gameNotification.message as ECPessoaComecouJogadaInterface;
                        let diffToIndex: number;
                        if(pessoComecouEtapa.etapa == 1) diffToIndex = 1;
                        else diffToIndex = this.quantidadeJogadores + 1;
                        
                        this.finalizadosEtapa[pessoComecouEtapa.idPessoa - diffToIndex] = 0;
                    }
                    else if(gameNotification.code == EC_PESSOA_FINALIZOU_JOGADA){
                        let pessoComecouEtapa: ECPessoaFinalizouJogadaInterface = gameNotification.message as ECPessoaFinalizouJogadaInterface;
                        let diffToIndex: number;
                        if(pessoComecouEtapa.etapa == 1) diffToIndex = 1;
                        else diffToIndex = this.quantidadeJogadores + 1;
                        
                        this.finalizadosEtapa[pessoComecouEtapa.idPessoa - diffToIndex] = 1;
                    }
                }
            }
        );
    }

    ngOnDestroy(){
        this.notificationSubscription.unsubscribe();
    }

    getColour(finalizado: number){
        if(finalizado == -1) return 'naoEntrou';
        else if(finalizado == 1) return 'finalizado';
        else return 'naoFinalizado';
    }

    getInfoPessoas(){
        this.masterService.getInfoPessoas(this.idJogo, this.etapa)
            .subscribe(
                (data: PersonSimplified[]) => {
                    this.pessoas = data;
                    this.finalizadosEtapa = [];
                    for (let i = 0; i < this.pessoas.length; i++) this.finalizadosEtapa.push(-1);
                },
                err => console.log(err)
            )
    }
}