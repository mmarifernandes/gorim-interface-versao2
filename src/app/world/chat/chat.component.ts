import { Component, Input, OnInit } from "@angular/core";

import { ChatInfo } from "./chat-info";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: [ './chat.component.scss' ]
})
export class ChatComponent implements OnInit{
    @Input() chatInfo: ChatInfo;

    nomePessoa: string;
    idPessoa: number;
    idJogo: number;
    role: string;
    cidade: string;

    constructor( ) { }

    ngOnInit(){
        this.nomePessoa = this.chatInfo.nomePessoa;
        this.idPessoa = this.chatInfo.idPessoa;
        this.idJogo = this.chatInfo.idJogo;
        this.role = this.chatInfo.role;
        this.cidade = this.chatInfo.cidade;
    }

}