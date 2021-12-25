import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InteraccionConRevista } from 'src/Modelos/interaccion-con-revista';
import { InteraccionesRequest } from 'src/Modelos/interacciones-request';
import { ResumenDeRevista } from 'src/Modelos/resumen-de-revista';
import { SolicitudInfoRevista } from 'src/Modelos/solicitud-info-revista';
import { Tag } from 'src/Modelos/tag';
import { BackendServiceConsultaUsuarioEditorService } from 'src/Servicios/backend-service-consulta-usuario-editor.service';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-resumen-revista-para-usuario-editor',
  templateUrl: './resumen-revista-para-usuario-editor.component.html',
  styleUrls: ['./resumen-revista-para-usuario-editor.component.css']
})
export class ResumenRevistaParaUsuarioEditorComponent implements OnInit {

  public formConfiguracion!: FormGroup;//fromulario reactivo
  public nombreRevista!: string | null;
  public banderaError: boolean = false;
  public banderaAcierto: boolean = false;
  public mensajeConfirmacion: string = "";
  public nombreUsuarioCreador!: string | null;
  public resumenRevista!: ResumenDeRevista;
  public tags = new Array<Tag>();
  public interaccionesRevista!: InteraccionConRevista;
  public url: string = "http://localhost:8080/revistas-app-api/ControladorAccionRevista";

  //variables que usaremos para mostrar los estados actuales de las interacciones
  public estadoActualComentarios!: string;
  public estadoActualLikes!: string;
  public estadoActualSuscripciones!: string;

  constructor(private route: ActivatedRoute, private backendService: BackendService, private formBuilder: FormBuilder
    , private backendServiceConsultaUsuarioEditorService: BackendServiceConsultaUsuarioEditorService) { }

  ngOnInit(): void {
    this.formConfiguracion = this.formBuilder.group({//llenamos los validadores de los campos del form
      estadoComentarios: ["", Validators.required],
      estadoLikes: ["", Validators.required],
      estadoSuscripcion: ["", Validators.required]
    });
    this.nombreRevista = this.route.snapshot.paramMap.get("nombreRevista");//obtenemos el nombre de la revista que el usuario quiere ver
    this.nombreUsuarioCreador = this.route.snapshot.paramMap.get("usuarioCreador");
    //mandamos a traer la info de la revista
    if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {//vemos que los daots no esten nulos
      this.backendService.obtenerInfoDeRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador)).subscribe
        ((resumen: ResumenDeRevista) => {
          this.resumenRevista = resumen
          //obenemos la foto de miniatura de la revista
          this.url += "?accion=traerCaratula&nombreRevista=" + this.resumenRevista.nombreRevista + "&usuarioCreador=" + this.resumenRevista.usuarioCreador;
        });
      //traemos los tags que posee esta revista
      this.backendService.traerTagsDeUnaRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador))
        .subscribe((tags: Array<Tag>) => {
          this.tags = tags;//igualamos el array de tags al del suscribre par`a que el ngFro lo represente en la vista
        });
      //mandamos a traer las interacciones de la revista en cuesion
      this.backendService.saberEstadoDeInteraccionesConRevista(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador)).subscribe
        ((interaccionesRevista: InteraccionConRevista) => {
          this.cambiarEstados(interaccionesRevista);


        });
    }
  }

  public guardarInformacion() {
    //lo primero que hacemos es traer los valores seleccionados en el form
    var estadoComentarios = this.formConfiguracion.controls.estadoComentarios.value;
    var estadoLikes = this.formConfiguracion.controls.estadoLikes.value;
    var estadoSuscripcion = this.formConfiguracion.controls.estadoSuscripcion.value;
    //ahora creamos el objreto que mandaremos a la api si nada es nulo
    if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {//vemos que los daots no esten nulos
      const interaccionesRequest = new InteraccionesRequest(estadoSuscripcion, estadoComentarios, estadoLikes,
        this.nombreRevista, this.nombreUsuarioCreador);
      //mandamos el objeto al service que mandara a guardar los cambios
      this.backendServiceConsultaUsuarioEditorService.guardarConfiguracion(interaccionesRequest)
        .subscribe((confirmacion: string) => {
          if (confirmacion == "Se guardaron tus configuraciones con exito.") {
            this.banderaAcierto = true;
            this.banderaError = false;
          } else {
            this.banderaAcierto = false;
            this.banderaError = true;
          }
          this.mensajeConfirmacion = confirmacion;
        });
    }
  }

  private cambiarEstados(interaccionesRevista: InteraccionConRevista) {
    this.estadoActualComentarios = "Activo";
    this.estadoActualLikes = "Activo";
    this.estadoActualSuscripciones = "Activo";

    if (interaccionesRevista.estadoComentarios == false) {
      this.estadoActualComentarios = "Inactivo";
    }
    if (interaccionesRevista.estadoLikes == false) {
      this.estadoActualLikes = "Inactivo";
    }
    if (interaccionesRevista.estadoSuscripciones == false) {
      this.estadoActualSuscripciones = "Inactivo";
    }
  }

}


