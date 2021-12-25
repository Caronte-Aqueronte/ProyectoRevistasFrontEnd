import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Anunciante } from 'src/Modelos/anunciante';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';

@Component({
  selector: 'app-crear-anunciante-form',
  templateUrl: './crear-anunciante-form.component.html',
  styleUrls: ['./crear-anunciante-form.component.css']
})
export class CrearAnuncianteFormComponent implements OnInit {

  public formCrearAnunciante!: FormGroup;//fromulario reactivo
  public mensajeConfirmacion: string = "";//mensje que mostraremos al usuario si hay error o acierto

  public banderaError: boolean = false;//bandera que ayuda a indicar si hay error 
  public banderaAcierto: boolean = false;//bandera que ayuda a indicar si se crea el anunciante con exito

  constructor(private backendService: BackendServiceConsultaAdministrativaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formCrearAnunciante = this.formBuilder.group({//llenamos los validadores de los campos del form
      nombreAnunciante: ["", Validators.required],
    });

  }

  public guardarAnunciante() {
    var nombreAnunciante = this.formCrearAnunciante.controls.nombreAnunciante.value;//obenemos el nombre del anunciante
    const anunciante = new Anunciante(nombreAnunciante);//creamos el anunciante
    this.backendService.guardarAnunciante(anunciante).subscribe((confirmacion: string) => {
      if (confirmacion == "Se guardo con exito el aununciante " + nombreAnunciante + ".") {//vamos si se trata de un mensaje de confirmacion
        //modificamos las banderas que ocultan los mensajes pop
        this.banderaAcierto = true;
        this.banderaError = false;

      } else {
         //modificamos las banderas que ocultan los mensajes pop
        this.banderaAcierto = false;
        this.banderaError = true;
      }
      //mostramos el mensaje de confirmacion
      this.mensajeConfirmacion = confirmacion;
    });
  }
}
