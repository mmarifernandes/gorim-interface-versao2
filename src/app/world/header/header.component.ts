import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() nomePersonagem: string;
    @Input() cidade: string;
    @Input() dinheiros: number = null;
    @Input() rodada: number;
    @Input() poluicaoMundo: number;
    @Input() saldo: string = "Dinheiros";

    constructor() { }

    ngOnInit(): void {
    }

}
