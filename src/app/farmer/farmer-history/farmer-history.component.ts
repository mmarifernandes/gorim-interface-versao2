import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FarmerHistory } from './farmer-history';
import { FarmerHistoryService } from './farmer-history.service';

@Component({
    selector: 'app-farmer-history',
    templateUrl: './farmer-history.component.html',
    styleUrls: ['./farmer-history.component.scss']
})
export class FarmerHistoryComponent implements OnInit {
    idJogo: number;
    idAgr: number;
    history: FarmerHistory;

    loadingMessage: string = 'Aguarde um instante enquanto carregamos os dados';

    constructor(
        private activatedRoute: ActivatedRoute,
        private agrHistoryService: FarmerHistoryService
    ){ }

    ngOnInit(): void {
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.idAgr = this.activatedRoute.snapshot.params.idAgr;
        this.getHistory();
    }

    getHistory(){
        this.agrHistoryService.getHistory(this.idJogo, this.idAgr).subscribe(
            (data: FarmerHistory) => {
                if(data != null) this.history = data;
                else this.loadingMessage = 'Tivemos um problema ao pegar os dados do servidor, por favor, reinicie a página';

                console.log(data);
            }
        );
    }

    isMaquina(produto: string){
        if(produto.toLowerCase().includes("comum") || produto.toLowerCase().includes("premium")) return false;
        return true;
    }

}
