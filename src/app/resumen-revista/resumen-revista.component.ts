import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConsultaSuscripcion } from 'src/Modelos/consulta-suscripcion';
import { ResumenDeRevista } from 'src/Modelos/resumen-de-revista';
import { Tag } from 'src/Modelos/tag';
import { BackendService } from 'src/Servicios/backend.service';
import { SolicitudInfoRevista } from '../../Modelos/solicitud-info-revista';

@Component({
  selector: 'app-resumen-revista',
  templateUrl: './resumen-revista.component.html',
  styleUrls: ['./resumen-revista.component.css']
})
export class ResumenRevistaComponent implements OnInit {

  public nombreRevista!: string | null;
  public nombreUsuarioCreador!: string | null;
  public resumenRevista!: ResumenDeRevista;
  public tags = new Array<Tag>();
  public url: string = "http://localhost:8080/revistas-app-api/ControladorAccionRevista";

  constructor(private route: ActivatedRoute, private router: Router, private cookiesService: CookieService, private backendService: BackendService) { }

  ngOnInit(): void {
    this.nombreRevista = this.route.snapshot.paramMap.get("nombreRevista");//obtenemos el nombre de la revista que el usuario quiere ver
    this.nombreUsuarioCreador = this.route.snapshot.paramMap.get("usuarioCreador");
    if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {
      //verificamos si el usuario esta suscrito a esta revista, de ser asi lo enviamos a que pueda leer la revista
      this.backendService.verSiUsuarioEstaSuscritoARevista
        (new ConsultaSuscripcion(this.cookiesService.get('Usuario'), this.nombreRevista, this.nombreUsuarioCreador))
        .subscribe((bandera: boolean) => {
          if (bandera == true) {//si esta suscrito entonces lo redirigimos
            this.router.navigate(['menu-lector/revista', this.nombreRevista, this.nombreUsuarioCreador]);
          } else {//si no entonces solicitamos el resumen de la revista
            if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {//vemos que los daots no esten nulos
              //mandamos a traer la info de la revista
              this.backendService.obtenerInfoDeRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador)).subscribe
                ((resumen: ResumenDeRevista) => {
                  this.resumenRevista = resumen
                  this.url += "?accion=traerCaratula&nombreRevista=" + this.resumenRevista.nombreRevista + "&usuarioCreador=" + this.resumenRevista.usuarioCreador;
                })
              this.backendService.traerTagsDeUnaRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador))
                .subscribe((tags: Array<Tag>) => {
                  this.tags = tags;
                })
            }
          }
        });
    }
  }

  public dirigirAPerfil() {
    this.router.navigate(['menu-lector/perfilEditor/', this.nombreUsuarioCreador]);
  }

  public redirirgirSuscripcion() {
    this.router.navigate(['menu-lector/suscribirse/', this.nombreRevista, this.nombreUsuarioCreador]);
  }
}


