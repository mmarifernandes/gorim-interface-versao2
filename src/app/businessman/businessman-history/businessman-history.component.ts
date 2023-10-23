import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessmanHistory } from './businessman-history';
import { BusinessmanHistoryService } from './businessman-history.service';

@Component({
    selector: 'app-businessman-history',
    templateUrl: './businessman-history.component.html',
    styleUrls: ['./businessman-history.component.scss']
})
export class BusinessmanHistoryComponent implements OnInit {
    idJogo: number;
    idEmp: number;
    history: BusinessmanHistory;

    loadingMessage: string = 'Aguarde um instante enquanto carregamos os dados';

    constructor(
        private activatedRoute: ActivatedRoute,
        private empHistoryService: BusinessmanHistoryService
    ) { }

    ngOnInit(): void {
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.idEmp = this.activatedRoute.snapshot.params.idEmp;
        this.getHistory();
    }

    getHistory(){
        this.empHistoryService.getHitory(this.idJogo, this.idEmp).subscribe(
            (data: BusinessmanHistory) => {
                if(data != null) this.history = data;
                else this.loadingMessage = 'Tivemos um problema ao pegar os dados do servidor, por favor, reinicie a página';

                console.log(data);
            },
            err => console.log(err)
        );
    }

}
