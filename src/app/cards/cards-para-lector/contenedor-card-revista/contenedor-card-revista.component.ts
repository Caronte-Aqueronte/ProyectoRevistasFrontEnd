import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Card } from 'src/Modelos/card';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-contenedor-card-revista',
  templateUrl: './contenedor-card-revista.component.html',
  styleUrls: ['./contenedor-card-revista.component.css'],
})
export class ContenedorCardRevistaComponent implements OnInit {

  public cards!: Array<any>;
  public titulo: string = "Revistas recomendadas";//titulo que se mostrara en el top de la pagina
  public revistaBusqueda: string = "";

  constructor(private backendService: BackendService, private cookiesService: CookieService) { }

  ngOnInit(): void {
    //lo primero que hacemos es traer las recomendaciones para el usuario
    this.backendService.recomendarRevistas(this.cookiesService.get('Usuario'))
      .subscribe((cards: Array<Card>) => {//nos suscribirmos al metodo y la respuesta que envie la igulamos a las cards
        this.cards = cards;
      });
  }
  public buscar() {
    //conseguimos el texto del inputo por su id
    var busqueda: string = ((document.getElementById("revistaBusqueda") as HTMLInputElement)).value;
    //segun que radio este activado asi utilizamos un metodo del service
    if (((document.getElementById("etiqueta") as HTMLInputElement)).checked) {//verificamos cual de los readios esta seleccionado
      //si la busqueda por etiqueta esta seleccionada entonces usamos el metodo de buscar por etiqueta
      this.backendService.buscarPorTag(busqueda)
        .subscribe((revistas: Array<Card>) => {
          this.cards = revistas;
        });
    }
    if (((document.getElementById("categoria") as HTMLInputElement)).checked) {
      //si la busqueda por categoria esta seleccionada entonces usamos el metodo de buscar por categoria
      this.backendService.buscarPorCategoria(busqueda)
        .subscribe((revistas: Array<Card>) => {
          this.cards = revistas;
        });
    }
  }

  public verSuscripciones() {
    //mandamos a traer todas las suscipciones del usuario a partir de su nombre de usuario
    this.backendService.verSuscripciones(this.cookiesService.get('Usuario')).subscribe
      ((cards: Array<any>) => {
        this.cards = cards;
      })
  }

}
