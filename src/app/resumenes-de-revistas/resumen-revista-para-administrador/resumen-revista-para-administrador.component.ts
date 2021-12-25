import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CostoPorDia } from 'src/Modelos/costo-por-dia';
import { ResumenDeRevista } from 'src/Modelos/resumen-de-revista';
import { SolicitudInfoRevista } from 'src/Modelos/solicitud-info-revista';
import { Tag } from 'src/Modelos/tag';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-resumen-revista-para-administrador',
  templateUrl: './resumen-revista-para-administrador.component.html',
  styleUrls: ['./resumen-revista-para-administrador.component.css']
})
export class ResumenRevistaParaAdministradorComponent implements OnInit {
  public formAsignarCosto!: FormGroup;//fromulario reactivo
  public nombreRevista!: string | null;
  public banderaError: boolean = false;
  public banderaAcierto: boolean = false;
  public mensajeConfirmacion: string = "";
  public nombreUsuarioCreador!: string | null;
  public resumenRevista!: ResumenDeRevista;
  public tags = new Array<Tag>();
  public url: string = "http://localhost:8080/revistas-app-api/ControladorAccionRevista";

  constructor(private route: ActivatedRoute, private backendService: BackendService, private formBuilder: FormBuilder
    , private backendServiceConsultaAdminstrativa: BackendServiceConsultaAdministrativaService) { }

  ngOnInit(): void {
    this.formAsignarCosto = this.formBuilder.group({//llenamos los validadores de los campos del form
      costo: ["", Validators.required],
      fecha: ["", Validators.required],
    });
    this.nombreRevista = this.route.snapshot.paramMap.get("nombreRevista");//obtenemos el nombre de la revista que el usuario quiere ver
    this.nombreUsuarioCreador = this.route.snapshot.paramMap.get("usuarioCreador");
    //mandamos a traer la info de la revista
    if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {//vemos que los daots no esten nulos
      this.backendServiceConsultaAdminstrativa.traerCostoPorDia(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador))
        .subscribe((costo: number) => {
          this.formAsignarCosto.controls.costo.setValue(costo);
        }
        );
      this.backendService.obtenerInfoDeRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador)).subscribe
        ((resumen: ResumenDeRevista) => {
          this.resumenRevista = resumen
          this.url += "?accion=traerCaratula&nombreRevista=" + this.resumenRevista.nombreRevista + "&usuarioCreador=" + this.resumenRevista.usuarioCreador;
        });
      this.backendService.traerTagsDeUnaRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador))
        .subscribe((tags: Array<Tag>) => {
          this.tags = tags;
        });
    }
  }

  public asignarCosto() {
    const costo: number = this.formAsignarCosto.controls.costo.value;
    const fechaDeValidez: string = this.formAsignarCosto.controls.fecha.value;
    if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {
      const costoPorDia = new CostoPorDia(this.nombreRevista, this.nombreUsuarioCreador, costo, fechaDeValidez);

      this.backendServiceConsultaAdminstrativa.asignarCostoPorDia(costoPorDia).subscribe
        ((confirmacion: string) => {
          if (confirmacion == "Se guardo el costo por dia con exito.") {
            this.banderaAcierto = true;
            this.banderaError = false;
            this.mensajeConfirmacion = confirmacion;
          } else {
            this.banderaAcierto = false;
            this.banderaError = true;
            this.mensajeConfirmacion = confirmacion;
          }
        });
    }
  }
}
