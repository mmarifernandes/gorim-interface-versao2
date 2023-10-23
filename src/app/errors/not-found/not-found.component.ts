import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  description = "Página não encontrada :("
  image = {
    link: '../../../assets/imgs/not-found-icon.png',
    alt: 'Icone da pagina não encontrada'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
