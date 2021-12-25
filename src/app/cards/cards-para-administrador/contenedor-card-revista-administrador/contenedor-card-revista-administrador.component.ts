import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Card } from 'src/Modelos/card';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-contenedor-card-revista-administrador',
  templateUrl: './contenedor-card-revista-administrador.component.html',
  styleUrls: ['./contenedor-card-revista-administrador.component.css']
})
export class ContenedorCardRevistaAdministradorComponent implements OnInit {

  public cards!: Array<Card>;
  constructor(private backendService: BackendService, private cookiesService: CookieService) { }

  ngOnInit(): void {
    //lo primero que hacemos es traer todas las revistas existentes
    this.backendService.traerTodasLasRevistas()
      .subscribe((cards: Array<Card>) => {//nos suscribirmos al metodo y la respuesta que envie la igulamos a las cards
        this.cards = cards;
      });

  }

}
