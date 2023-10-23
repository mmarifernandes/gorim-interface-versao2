import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SupervisorHistory } from './supervisor-history';
import { SupervisorHistoryService } from './supervisor-history.service';

@Component({
    selector: 'app-supervisor-history',
    templateUrl: './supervisor-history.component.html',
    styleUrls: ['./supervisor-history.component.scss']
})
export class SupervisorHistoryComponent implements OnInit {

    idJogo: number;
    idFis: number;
    history: SupervisorHistory;

    loadingMessage: string = 'Aguarde um instante enquanto carregamos os dados';

    constructor(
        private activatedRoute: ActivatedRoute,
        private fisHistoryService: SupervisorHistoryService
    ) { }

    ngOnInit(): void {
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.idFis = this.activatedRoute.snapshot.params.idFis;
        this.getHistory();
    }

    getHistory(){
        this.fisHistoryService.getHitory(this.idJogo, this.idFis).subscribe(
            (data: SupervisorHistory) => {
                if(data != null) this.history = data;
                else this.loadingMessage = 'Tivemos um problema ao pegar os dados do servidor, por favor, reinicie a página';
            },
            err => console.log(err)
        );
    }

    isMaquina(produto: string){
        if(produto.toLowerCase().includes("Comum") || produto.toLowerCase().includes("premium")) return false;
        return true;
    }

}
