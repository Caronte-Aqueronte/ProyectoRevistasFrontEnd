import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Anunciante } from 'src/Modelos/anunciante';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';

@Component({
  selector: 'app-crear-anuncio-imagen-form',
  templateUrl: './crear-anuncio-imagen-form.component.html',
  styleUrls: ['./crear-anuncio-imagen-form.component.css']
})
export class CrearAnuncioImagenFormComponent implements OnInit {

  public formCrearAnunciante!: FormGroup;//fromulario reactivo
  public anunciantes!: Array<Anunciante>;

  public mensajeConfirmacion: string = "";//mensje que mostraremos al usuario si hay error o acierto
  public banderaError: boolean = false;//bandera que ayuda a indicar si hay error 
  public banderaAcierto: boolean = false;//bandera que ayuda a indicar si se crea el anunciante con exito

  constructor(private backendService: BackendServiceConsultaAdministrativaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formCrearAnunciante = this.formBuilder.group({//llenamos los validadores de los campos del form
      nombreAnuncio: ["", Validators.required],
      nombreAnunciante: ["", Validators.required],
      textoAnuncio: ["", Validators.required]
    });
    //mandamos a traer todos los anunciantes
    this.backendService.traerAnunciantes().subscribe((anunciantes: Array<Anunciante>) => {
      this.anunciantes = anunciantes;
    })
  }

  public guardarAnuncioDeTexto() {
    this.backendService.

  }
}
