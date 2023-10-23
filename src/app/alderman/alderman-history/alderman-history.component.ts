import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AldermanHistory } from './alderman-history';
import { AldermanHistoryService } from './alderman-history.service';

@Component({
    selector: 'app-alderman-history',
    templateUrl: './alderman-history.component.html',
    styleUrls: ['./alderman-history.component.scss']
})
export class AldermanHistoryComponent implements OnInit {
    
    idJogo: number;

    idVer: number;
    history: AldermanHistory;

    loadingMessage: string = 'Aguarde um instante enquanto carregamos os dados';

    constructor(
        private activatedRoute: ActivatedRoute,
        private empHistoryService: AldermanHistoryService
    ) { }

    ngOnInit(): void {
        this.idVer = this.activatedRoute.snapshot.params.idVer;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.getHistory();
    }

    getHistory(){
        this.empHistoryService.getHitory(this.idJogo, this.idVer).subscribe(
            (data: AldermanHistory) => {
                if(data != null) this.history = data;
                else this.loadingMessage = 'Tivemos um problema ao pegar os dados do servidor, por favor, reinicie a página';
            },
            err => console.log(err)
        );
    }

}
