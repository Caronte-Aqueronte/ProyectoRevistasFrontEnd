import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AnuncioVideo } from 'src/Modelos/anuncio-video';
import { HistorialAnuncio } from 'src/Modelos/historial-anuncio';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';

@Component({
  selector: 'app-anuncio-video',
  templateUrl: './anuncio-video.component.html',
  styleUrls: ['./anuncio-video.component.css']
})
export class AnuncioVideoComponent implements OnInit {

  public anuncio!: AnuncioVideo;
  public urlSegura!: SafeResourceUrl;

  constructor(private backendServiceConsultaAdministrativaService: BackendServiceConsultaAdministrativaService,
    private cookiesService: CookieService, private sanitizer: DomSanitizer) {
    this.anuncio = new AnuncioVideo("", "", "", "");
  }

  ngOnInit(): void {
    const nombreUsuario: string = this.cookiesService.get('Usuario');//nombre del usuairo logeado
    const localizacion: string = window.location.href;//localizacion del anuncio
    this.backendServiceConsultaAdministrativaService.traerAnuncioVideo(nombreUsuario).subscribe
      ((anuncio: AnuncioVideo) => {//traemos el anuncio de video
        if (anuncio != null) {//media vez el anuncio exite entonces podecemos a mostrarlo
          this.urlSegura = this.transform(anuncio.link);
          this.anuncio = anuncio;
          //crear un historial para enviarlo a guardar
          const historial: HistorialAnuncio = new HistorialAnuncio(this.anuncio.nombreAnuncio, this.anuncio.nombreAnunciante, localizacion);
          this.backendServiceConsultaAdministrativaService.guardarHistorial(historial).subscribe
            ();
        }
      });
  }

  /**
   * Transforma un recurso a una recurso seguro
   * @param url 
   * @returns 
   */
  private transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
