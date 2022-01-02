import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AnuncioImagen } from 'src/Modelos/anuncio-imagen';
import { HistorialAnuncio } from 'src/Modelos/historial-anuncio';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';

@Component({
  selector: 'app-anuncio-imagen',
  templateUrl: './anuncio-imagen.component.html',
  styleUrls: ['./anuncio-imagen.component.css']
})
export class AnuncioImagenComponent implements OnInit {

  public url: string = "http://localhost:8080/revistas-app-api/ConstroladorConsultaAdminstrativa"
  public anuncio!: AnuncioImagen;//anuncio que traeremos de la api
  constructor(private backendServiceConsultaAdministrativaService: BackendServiceConsultaAdministrativaService
    , private cookiesService: CookieService) { 
    }

  ngOnInit(): void {
    //nombre del usuario logeado
    const nombreUsuario: string = this.cookiesService.get('Usuario');
    const localizacion: string = window.location.href;//localizacion del anuncio
    //mandamos a traer el anuncio
    this.backendServiceConsultaAdministrativaService.traerAnuncioImagen(nombreUsuario)
      .subscribe((anuncio: AnuncioImagen) => {
        if (anuncio != null) {
          this.anuncio = anuncio;//igualamos los anuncios
          this.url = this.url + "?nombreAnuncio=" + anuncio.nombreAnuncio + "&nombreAnunciante=" + anuncio.nombreAnunciante;
          //crear un historial para enviarlo a guardar
          const historial: HistorialAnuncio = new HistorialAnuncio(this.anuncio.nombreAnuncio, this.anuncio.nombreAnunciante, localizacion);
          this.backendServiceConsultaAdministrativaService.guardarHistorial(historial).subscribe
            ();
        }
      });
  }

}
