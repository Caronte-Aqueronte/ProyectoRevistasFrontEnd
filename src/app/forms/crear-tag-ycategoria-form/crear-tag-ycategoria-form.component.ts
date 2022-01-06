import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';

@Component({
  selector: 'app-crear-tag-ycategoria-form',
  templateUrl: './crear-tag-ycategoria-form.component.html',
  styleUrls: ['./crear-tag-ycategoria-form.component.css']
})
export class CrearTagYCategoriaFormComponent implements OnInit {

  public formCrearCategoria!: FormGroup;//fromulario reactivo 
  public formCrearTag!: FormGroup;//fromulario reactivo
  public banderaErrorCategorias: boolean = false;
  public banderaErrorTags: boolean = false;

  public banderaAciertoCategorias: boolean = false;
  public banderaAciertoTags: boolean = false;
  public mensajeCategorias: string = "";
  public mensajeTags: string = "";

  constructor(private formBuilder: FormBuilder, private backendService: BackendServiceConsultaAdministrativaService) { }


  ngOnInit(): void {
    this.formCrearCategoria = this.formBuilder.group({//llenamos los validadores de los campos del form
      nombreCategoria: ["", Validators.required],
    });
    this.formCrearTag = this.formBuilder.group({//llenamos los validadores de los campos del form
      nombreTag: ["", Validators.required],
    });
  }

  public guardarCategoria() {
    this.backendService.guardarCategoria(this.formCrearCategoria.value).subscribe
      ((confirmacion: string) => {
        if (confirmacion == "Se guardo la categoria con exito.") {
          this.banderaAciertoCategorias = true;
          this.banderaErrorCategorias = false;
        } else {
          this.banderaAciertoCategorias = false;
          this.banderaErrorCategorias = true;
        }
        this.mensajeCategorias = confirmacion;
      });
  }
  public guardarTag() {
    this.backendService.guardarTag(this.formCrearTag.value).subscribe
      ((confirmacion: string) => {
        if (confirmacion == "Se guardo el tag con exito.") {
          this.banderaAciertoTags = true;
          this.banderaErrorTags = false;
        } else {
          this.banderaAciertoTags = false;
          this.banderaErrorTags = true;
        }
        this.mensajeTags = confirmacion;
      });
  }
}
