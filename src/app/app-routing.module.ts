import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//List of components
import { HomeComponent } from './home/home.component';
import { FarmerComponent } from './farmer/farmer.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { BusinessmanComponent } from './businessman/businessman.component';
import { FarmerHistoryComponent } from './farmer/farmer-history/farmer-history.component';
import { BusinessmanHistoryComponent } from './businessman/businessman-history/businessman-history.component';
import { MasterComponent } from './master/master.component';
import { WaitingPageComponent } from './waiting-page/waiting-page.component';
import { AlternativeSecondStagePageComponent } from './alternative-second-stage-page/alertnative-second-stage-page.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { SupervisorHistoryComponent } from './supervisor/supervisor-history/supervisor-history.component';
import { MayorComponent } from './mayor/mayor.component';
import { MayorHistoryComponent } from './mayor/mayor-history/mayor-history.component';
import { AldermanComponent } from './alderman/alderman.component';
import { AldermanHistoryComponent } from './alderman/alderman-history/alderman-history.component';
import { GameOverComponent } from './gameover/gameover.component';

const routes: Routes = [
    {
        path: '', // home
        component: HomeComponent
    },
    {
        path: ':idJogo/gameover', //gameover
        component: GameOverComponent
    },
    {
        path: ':idJogo/empresario/:idEmp', //businessman 
        component: BusinessmanComponent
    },
    {
        path: ':idJogo/historico-empresario/:idEmp', //history-businessman
        component: BusinessmanHistoryComponent
    },
    {
        path: ':idJogo/agricultor/:idAgr', //farmer
        component: FarmerComponent
    },
    {
        path: ':idJogo/historico-agricultor/:idAgr', //history-farmer
        component: FarmerHistoryComponent
    },
    {
        path: ':idJogo/fiscalAmbiental/:idFis', //supervisor 
        component: SupervisorComponent
    },
    {
        path: ':idJogo/historico-fiscalAmbiental/:idFis', //history-supervisor
        component: SupervisorHistoryComponent
    },
    {
        path: ':idJogo/prefeito/:idPref', //mayor 
        component: MayorComponent
    },
    {
        path: ':idJogo/historico-prefeito/:idPref', //history-mayor
        component: MayorHistoryComponent
    },
    {
        path: ':idJogo/vereador/:idVer', //alderman 
        component: AldermanComponent
    },
    {
        path: ':idJogo/historico-vereador/:idVer', //history-alderman
        component: AldermanHistoryComponent
    },
    {
        path: ':idJogo/mestre', //master
        component: MasterComponent
    },
    {
        path: ':idJogo/waitingPage/:idPessoa', //history-businessman
        component: WaitingPageComponent
    },
    {
        path: ':idJogo/segundaEtapa/:idPessoa', //alternative-second-stage-page
        component: AlternativeSecondStagePageComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
