import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AldermanService } from '../alderman/alderman.service';
import { Businessman } from '../businessman/businessman';
import { BusinessmanService } from '../businessman/businessman.service';
import { FarmerService } from '../farmer/farmer.service';
import { MayorService } from '../mayor/mayor.service';
import { SupervisorService } from '../supervisor/supervisor.service';
import { World } from '../world/world';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class WaitingPageService{

    constructor(
        private httpClient: HttpClient,
        private empService: BusinessmanService,
        private agrService: FarmerService,
        private fisService: SupervisorService,
        private prefService: MayorService,
        private verService: AldermanService
    ){ }

    getPapelSegundaEtapa(idJogo: number, idPessoa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/papelSegundaEtapa/' + idPessoa
        );
    }

    getInfoMundo(idJogo: number){
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        )
    }

    getInfoEmpresario(idJogo: number, idPessoa: number){
        return this.empService.getInfo(idJogo, idPessoa);
    }

    getInfoAgricultor(idJogo: number, idPessoa: number){
        return this.agrService.getInfo(idJogo, idPessoa);
    }

    getInfoFiscal(idJogo: number, idPessoa: number){
        return this.fisService.getInfo(idJogo, idPessoa);
    }

    getInfoPrefeito(idJogo: number, idPessoa: number){
        return this.prefService.getInfo(idJogo, idPessoa);
    }

    getInfoVereador(idJogo: number, idPessoa: number){
        return this.verService.getInfo(idJogo, idPessoa);
    }

    verificaTodosTerminaramEtapa(idJogo: number, etapa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaTodosTerminaramEtapa/' + etapa
        );
    }
}