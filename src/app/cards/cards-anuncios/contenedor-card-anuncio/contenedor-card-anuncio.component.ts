import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/Modelos/anuncio';
import { AnuncioVideo } from 'src/Modelos/anuncio-video';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';

@Component({
  selector: 'app-contenedor-card-anuncio',
  templateUrl: './contenedor-card-anuncio.component.html',
  styleUrls: ['./contenedor-card-anuncio.component.css']
})
export class ContenedorCardAnuncioComponent implements OnInit {

  public cards!: Array<Anuncio>;//array que guardara la informacion de las cards

  constructor(private backendServiceConsultaAdministrativaService: BackendServiceConsultaAdministrativaService) { }

  ngOnInit(): void {
    //al iniciar el componente traemos todos los anuncios de la base de datos
    this.backendServiceConsultaAdministrativaService.traerAnuncios().subscribe
      ((cards: Array<Anuncio>) => {
        this.cards = cards;
      });
  }

}
