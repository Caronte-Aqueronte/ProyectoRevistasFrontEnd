import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Card } from 'src/Modelos/card';
import { BackendServiceConsultaUsuarioEditorService } from 'src/Servicios/backend-service-consulta-usuario-editor.service';

@Component({
  selector: 'app-contenedor-card-revista-editor',
  templateUrl: './contenedor-card-revista-editor.component.html',
  styleUrls: ['./contenedor-card-revista-editor.component.css']
})
export class ContenedorCardRevistaEditorComponent implements OnInit {

  public cards!: Array<Card>;
  constructor(private backendServiceConsultaUsuarioEditorService: BackendServiceConsultaUsuarioEditorService, private cookiesService: CookieService) { }

  ngOnInit(): void {
    //obtenemos todas las revistas del usuario edior logeado
    this.backendServiceConsultaUsuarioEditorService.traerTodasLasRevistasDeEditor(this.cookiesService.get('Usuario'))
      .subscribe((cards: Array<Card>) => {
        this.cards = cards;
      })
  }

}
