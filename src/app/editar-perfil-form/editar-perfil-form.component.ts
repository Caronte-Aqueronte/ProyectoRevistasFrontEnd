import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ModeloPerfil } from 'src/Modelos/modelo-perfil';
import { ModeloPerfilRequest } from 'src/Modelos/modelo-perfil-request';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-editar-perfil-form',
  templateUrl: './editar-perfil-form.component.html'
})
export class EditarPerfilFormComponent implements OnInit {

  public formEditarPerfil!: FormGroup;//fromulario reactivo
  public hobbies!: string;
  public descripcion!: string;
  public nombreUsuario!: string;

  public banderaAceptacion: boolean = false;
  public banderaError: boolean = false;
  public banderaErrorFotoPerfil = false;
  public banderaAceptacionFotoPerfil: boolean = false;
  public mensajeDeAlerta: string = "";

  public archivoSeleccionado: File | null = null;
  public urlFoto: string = "http://localhost:8080/revistas-app-api/ControladorSubirFoto";
  constructor(private formBuilder: FormBuilder, private cookiesService: CookieService, private backendService: BackendService
    , private router: Router) {

  }

  ngOnInit(): void {
    this.formEditarPerfil = this.formBuilder.group({//llenamos los validadores de los campos del form
      usuario: ["", Validators.required],
      descripcion: ["", Validators.required],
      hobbies: ["", Validators.required]
    });
    this.urlFoto += "?nombreUsuario=" + this.cookiesService.get("Usuario");//le concatenamos al la url el nombre d eusuario para que sirva al momento de hacer la request
    this.backendService.traerPerfil(this.cookiesService.get("Usuario"))//mandamos a traer los datos del usuario en cuestion
      .subscribe((perfil: ModeloPerfil) => {//con los datos que trae el modleo del perfil llenamos los parametros del formulario
        this.formEditarPerfil.controls['usuario'].setValue(this.cookiesService.get("Usuario"));
        this.formEditarPerfil.controls['descripcion'].setValue(perfil.descripcion);
        this.formEditarPerfil.controls['hobbies'].setValue(perfil.hobbies);
      });
  }
  public archivoCambiado(evento: Event) {//este metodo cambia el archivo cargado
    const files = (evento.target as HTMLInputElement).files;
    if (files != null) {
      this.archivoSeleccionado = files.item(0);
    }
  }
  //este metodo evaluea que el archivo no sea nulo y luego lo envia al metodo del servicio que contacta al backend
  //espera un string que sera mostrado en un mensaje pop de confimacion o de error
  public guardarFotoDePerfil(): void {
    if (this.archivoSeleccionado != null) {//verificar que no sea nulo el archivo
      this.banderaErrorFotoPerfil = false;//si no es nulo no mostramos el mensaje de error
      this.backendService.actulizarFotoPerfil(this.archivoSeleccionado, this.cookiesService.get("Usuario"))//mandamos el archivo al servicion
        .subscribe((mensajeConfirmacion: string) => {//esperamos el string que manda el meodo
          if (mensajeConfirmacion == "Se actualizo foto de perfil con exito") {//si el string es igual entonces se actualizo el perfil
            window.location.reload();
          } else {
            this.banderaErrorFotoPerfil = true;
            this.mensajeDeAlerta = mensajeConfirmacion;
          }
        });
    } else {//si el archivo es nulo le indicamos al usuario que seleccione uno
      this.banderaErrorFotoPerfil = true;
      this.mensajeDeAlerta = "Seleccione un archivo valido para cargarlo"
    }
  }
  //este metodo manda los datos del formulario al servicio que comunica al backend
  public guardarCambios() {
    this.backendService.mandarPerfil(this.formEditarPerfil.value)
      .subscribe((confirmacion: string) => {//esperamos el mensaje de confirmacion
        if (confirmacion == "Se guardaron los cambios de tu perfil") {//si el mensaje es igual entonces mostramos el mensaje de confimacion
          this.banderaError = false;
          this.banderaAceptacion = true;
          this.mensajeDeAlerta = confirmacion;
        } else {//sino entonces mostramos el mensaje de error
          this.banderaError = true;
          this.banderaAceptacion = false;
          this.mensajeDeAlerta = confirmacion;
        }
      });

  }
}
