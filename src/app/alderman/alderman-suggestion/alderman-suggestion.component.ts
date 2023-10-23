import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { WebStorageService } from 'src/app/world/web-storage/webstorage.service';
import { Mayor } from 'src/app/mayor/mayor';
import { Tax } from 'src/app/mayor/postForm';
import { AlertService } from 'src/app/world/alert/alert.service';
import { AldermanSuggestionService } from './alderman-suggestion.service';
import { AldermanSuggestion } from './alderman-suggestion';

@Component({
    selector: 'app-alderman-suggestion',
    templateUrl: './alderman-suggestion.component.html',
    styleUrls: [ './alderman-suggestion.component.scss' ]
})
export class AldermanSuggestionComponent implements OnInit {

    @Input() idJogo: number;
    
    @Input() idVer: number;
    idSugestao: number;
    suggestionForm: FormGroup;

    selector: number;
    selectData: string[][] = [];
    radioOptions: string[] = [];

    constructor(
        private suggestionService: AldermanSuggestionService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private webStorageService: WebStorageService
    ){ }

    ngOnInit(){
        if(this.webStorageService.hasData('suggestion' + this.idVer + 'idSugestao'))
            this.idSugestao = this.webStorageService.getData('suggestion' + this.idVer + 'idSugestao');
        this.webStorageService.setData('suggestion' + this.idVer + 'idSugestao', this.idSugestao);
        
        this.resetForm();
        this.suggestionService.getInfoPrefeito(this.idJogo, this.idVer).subscribe(
            (data: Mayor) => {
                if(data != null){
                    let acoes: string[] = [];
                    data.acoesAmbientais.forEach(
                        acao => acoes.push(acao.tipo)
                    );
                    this.selectData.push(acoes);
                    this.selectData.push(['Baixo', 'Médio', 'Alto']);
                    this.radioOptions.push('Ações Ambientais');
                    let i = 0;
                    do {
                        i++;
                        this.radioOptions.push('Taxa ' + i);
                    } while(i < data.taxas.length);
                }
            },
            err => console.log(err)
        );
    }

    resetForm(){
        this.selector = -1;
        this.suggestionForm = this.formBuilder.group({
            sugestao: ['', [Validators.required]],
            especificacao: ['', [Validators.required]]
        });
    }

    loadSelectOptions(event: MatRadioChange){
        this.selector = (event.value == '0') ? 0 : 1;
    }

    enviarSugestao(){
        if(this.suggestionForm.valid){
            let newImposto: Tax = {
                tipo: this.suggestionForm.get('sugestao').value as number - 1,
                taxa: (this.selector > 0) ? this.suggestionForm.get('especificacao').value : ''
            };

            let newAcaoAmbiental: string =
                (this.selector == 0) ? this.suggestionForm.get('especificacao').value : '';

            this.suggestionService.postSuggestion(
                this.idJogo,
                this.idVer,
                {
                    tipoSugestao: this.selector,
                    aceito: false,
                    idSugestao: this.idSugestao,
                    imposto: newImposto,
                    acaoAmbiental: newAcaoAmbiental
                } as AldermanSuggestion
            ).subscribe(
                () => {
                    this.resetForm();
                    this.idSugestao++;
                    this.webStorageService.setData('suggestion' + this.idVer + 'idSugestao', this.idSugestao);
                    this.alertService.success('Sugestão enviada ao Prefeito.');
                },
                err => {
                    console.log(err);
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                }
            );
        }
        else this.alertService.warning('Preencha todos os campos do formulário!');
    }

}