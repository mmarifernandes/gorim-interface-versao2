import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MayorHistory } from './mayor-history';
import { MayorHistoryService } from './mayor-history.service';

@Component({
    selector: 'app-mayor-history',
    templateUrl: './mayor-history.component.html',
    styleUrls: ['./mayor-history.component.scss']
})
export class MayorHistoryComponent implements OnInit {
    
    idJogo: number;
    idPref: number;
    history: MayorHistory;

    loadingMessage: string = 'Aguarde um instante enquanto carregamos os dados';

    constructor(
        private activatedRoute: ActivatedRoute,
        private prefHistoryService: MayorHistoryService
    ) { }

    ngOnInit(): void {
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.idPref = this.activatedRoute.snapshot.params.idPref;
        this.getHistory();
    }

    getHistory(){
        this.prefHistoryService.getHitory(this.idJogo, this.idPref).subscribe(
            (data: MayorHistory) => {
                if(data != null) this.history = data;
                else this.loadingMessage = 'Tivemos um problema ao pegar os dados do servidor, por favor, reinicie a página';

                console.log(data);
            },
            err => console.log(err)
        );
    }

    isMaquina(produto: string){
        if(produto.toLowerCase().includes("comum") || produto.toLowerCase().includes("premium")) return false;
        return true;
    }

}
