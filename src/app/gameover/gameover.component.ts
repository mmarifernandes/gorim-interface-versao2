import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../world/alert/alert.service';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { GameOver } from './gameover';
import { GameOverService } from './gameover.service';

@Component({
    selector: 'app-gameover',
    templateUrl: './gameover.component.html',
    styleUrls: ['./gameover.component.scss']
})
export class GameOverComponent implements OnInit {

    gameoverData: GameOver = null;
    idJogo: number;

    constructor(
        private gameOverService: GameOverService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService,
        private webStorageService: WebStorageService,
        private wsService: WebSocketService
    ){ }

    ngOnInit(): void {
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.wsService.disconnect();
        this.gameOverService.getGameOverData(this.idJogo).subscribe(
            (data: GameOver) => {
                if(data != null && !this.isEmpty(data)) this.gameoverData = data;
                else this.alertService.warning('Algo deu errado. Por favor, atualize a página.');

                this.webStorageService.clearAll();
            },
            (err) => console.log(err)
        );
    }

    isEmpty(gameoverData: GameOver){
        if(
            isNaN(gameoverData.etapa) &&
            isNaN(gameoverData.idJogo) &&
            isNaN(gameoverData.poluicaoMundo) &&
            isNaN(gameoverData.rodada) &&
            !gameoverData.resumoJogadores
        ) return true;
        else return false;
    }

}