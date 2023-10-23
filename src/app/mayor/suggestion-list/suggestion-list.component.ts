import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AldermanSuggestion } from 'src/app/alderman/alderman-suggestion/alderman-suggestion';
import { AlertService } from 'src/app/world/alert/alert.service';
import { SharedDataWrap } from 'src/app/world/models/shared-data-wrap';
import { MayorService } from '../mayor.service';
import { SuggestionListService } from './suggestion-list.service';

@Component({
    selector: 'app-suggestion-list',
    templateUrl: './suggestion-list.component.html',
    styleUrls: [ './suggestion-list.component.scss' ]
})
export class SuggestionListComponent implements OnInit, OnDestroy {

    @Input() idJogo: number;
    @Input() idPref: number;

    quantidadeSugestoes: number = 0;
    suggestions: AldermanSuggestion[] = [];

    private suggestionsSubscription: Subscription;

    private stageStartTime = Date.now();

    constructor(
        private suggestionListService: SuggestionListService,
        private alertService: AlertService,
        private prefService: MayorService
    ){ }

    ngOnInit(){
        this.suggestionListService.getSuggestions(this.idJogo, this.idPref).subscribe(
            (data: AldermanSuggestion[]) => {
                if(data != null){
                    if(this.quantidadeSugestoes < data.length){
                        this.quantidadeSugestoes = data.length;
                        this.alertService.info('Você tem novas sugestões do Vereador.');
                    }
                    this.suggestions = data;
                }
            }
        );

        this.suggestionsSubscription = this.prefService.sharedNewSuggestion.subscribe(
            (wrap: SharedDataWrap) => {
                if((wrap != null) && (wrap.time > this.stageStartTime)){
                    let newSuggestion: AldermanSuggestion = wrap.data as AldermanSuggestion;
                    this.quantidadeSugestoes++;
                    this.suggestions.push(newSuggestion);
                    this.alertService.info('Você tem novas sugestões do Vereador.');
                }

            }
        );
    }

    ngOnDestroy(){
        this.suggestionsSubscription.unsubscribe();
    }

    isTaxSuggestion(response: AldermanSuggestion){
        if(response.tipoSugestao == 0) return false;
        return true;
    }

    sendResponse(response: AldermanSuggestion, aceito: boolean){
        response.aceito = aceito;
        this.suggestionListService.postResponse(this.idJogo, this.idPref, response).subscribe(
            () => {
                this.alertService.success('Resposta enviada.');
                this.quantidadeSugestoes--;
                let aux: AldermanSuggestion[] = [];
                this.suggestions.forEach(
                    x => { if(x != response) aux.push(x); }
                );
                console.log(aux);
                this.suggestions = aux;
            },
            err => {
                console.log(err);
                this.alertService.danger('Algo deu errado. Por favor, tente novamente.')
            }
        );
    }
}