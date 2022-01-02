import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AnuncioTexto } from 'src/Modelos/anuncio-texto';
import { HistorialAnuncio } from 'src/Modelos/historial-anuncio';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';

@Component({
  selector: 'app-anuncio-texto',
  templateUrl: './anuncio-texto.component.html',
  styleUrls: ['./anuncio-texto.component.css']
})
export class AnuncioTextoComponent implements OnInit {
  public anuncio!: AnuncioTexto;//anuncio que traeremos de la api
  constructor(private backendServiceConsultaAdministrativaService: BackendServiceConsultaAdministrativaService
    , private cookiesService: CookieService) { 
      this.anuncio = new AnuncioTexto("","","");
    }

  ngOnInit(): void {
    //nombre del usuario logeado
    const nombreUsuario: string = this.cookiesService.get('Usuario');
    const localizacion: string = window.location.href;//localizacion del anuncio
    //mandamos a traer el anuncio
    this.backendServiceConsultaAdministrativaService.traerAnuncioTexto(nombreUsuario)
      .subscribe((anuncio: AnuncioTexto) => {
        if (anuncio != null) {
          this.anuncio = anuncio;//igualamos los anuncios
          //crear un historial para enviarlo a guardar
          const historial: HistorialAnuncio = new HistorialAnuncio(this.anuncio.nombreAnuncio, this.anuncio.nombreAnunciante, localizacion);
          this.backendServiceConsultaAdministrativaService.guardarHistorial(historial).subscribe
            ();
        }
      });
  }

}
