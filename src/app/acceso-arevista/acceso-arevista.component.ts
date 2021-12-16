import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from 'src/Modelos/comentario';
import { InteraccionConRevista } from 'src/Modelos/interaccion-con-revista';
import { ResumenDeRevista } from 'src/Modelos/resumen-de-revista';
import { SolicitudInfoRevista } from 'src/Modelos/solicitud-info-revista';
import { Tag } from 'src/Modelos/tag';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-acceso-arevista',
  templateUrl: './acceso-arevista.component.html',
  styleUrls: ['./acceso-arevista.component.css']
})
export class AccesoARevistaComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private backendService: BackendService, private sanitizer: DomSanitizer) { }

  public nombreRevista!: string | null;
  public nombreUsuarioCreador!: string | null;
  public resumenRevista!: ResumenDeRevista;
  public interacciones!: InteraccionConRevista;
  public tags = new Array<Tag>();
  public banderaErrorComentario: boolean = false;
  public mesnajeConfimacionComentario: string = "";
  public comentarios = new Array<Comentario>();

  public urlCaratula: string = "http://localhost:8080/revistas-app-api/ControladorAccionRevista";
  public urlPdf: string = "http://localhost:8080/revistas-app-api/ControladorAccionRevista";
  public urlSegura!: SafeResourceUrl;

  ngOnInit(): void {
    //primero traemos todos los parametros de la revista que queremos visualizar
    this.nombreRevista = this.route.snapshot.paramMap.get("nombreRevista");//obtenemos el nombre de la revista que el usuario quiere ver
    this.nombreUsuarioCreador = this.route.snapshot.paramMap.get("usuarioCreador");//obtenemos el nombre del usuario creador
    //modificamos los url para que manden a traer el pdf y la caratula
    this.urlCaratula += "?accion=traerCaratula&nombreRevista=" + this.nombreRevista + "&usuarioCreador=" + this.nombreUsuarioCreador;
    this.urlPdf += "?accion=traerPdf&nombreRevista=" + this.nombreRevista + "&usuarioCreador=" + this.nombreUsuarioCreador;
    this.urlSegura = this.transform(this.urlPdf);
    //mandamos a la info de la revista
    if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {
      //traemos la info de la revista
      this.backendService.obtenerInfoDeRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador)).subscribe
        ((resumen: ResumenDeRevista) => {
          this.resumenRevista = resumen;//igualamos los resumenes para que sean mostrados en el html
        });
      //traemos el estado de todas las interacicons para ocultar o no los comentarios y los likes
      this.backendService.saberEstadoDeInteraccionesConRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador)).subscribe
        ((interacciones: InteraccionConRevista) => {
          this.interacciones = interacciones;//igualamos las interacciones para representarlas en el htlm
        });
      //traemos los tags de la revista
      this.backendService.traerTagsDeUnaRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador))
        .subscribe((tags: Array<Tag>) => {
          this.tags = tags;//igualar los tags para que sean vistos en el html
        })
      //traemos todos los comentarios de la revista y los igualamos para que sean representados en la vista
      this.backendService.traerComentariosDeUnaRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador))
        .subscribe((comentarios: Array<Comentario>) => {
          this.comentarios = comentarios;
        });
    }
  }

  /**
   * Redirige al usuario a otra pestaña
   */
  public dirigirAPerfil() {
    this.router.navigate(['menu-lector/perfilEditor/', this.nombreUsuarioCreador]);
  }

  /**
   * Transforma un recurso a una recurso seguro
   * @param url 
   * @returns 
   */
  private transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public darMeGusta() {
    if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {
      this.backendService.darMeGustaARevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador))
        .subscribe(() => {
        });
    }
  }

  public hacerComentario() {
    //conseguimos el texto del input comentario
    var contenidoComentario: string = ((document.getElementById("comentario") as HTMLInputElement)).value;
    //construimos un objeto Comentario con los datos obtenidos
    if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {
      const comentario = new Comentario(contenidoComentario, this.nombreRevista, this.nombreUsuarioCreador);
      //mandamos a insertar el nuevo comentario
      this.backendService.hacerComentario(comentario).subscribe((confirmacion: string) => {
        if (confirmacion == "Se inserto tu comentario con exito.") {
          this.comentarios.push(comentario);//si se inserto con exito entonces guardamos el comentario en el array para que sea mostrado en htlm
        } else {
          this.mesnajeConfimacionComentario = confirmacion;
          this.banderaErrorComentario = true;
        }
      });
    }

  }
}
