import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Anunciante } from 'src/Modelos/anunciante';
import { Tag } from 'src/Modelos/tag';
import { TagAnuncio } from 'src/Modelos/tag-anuncio';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-crear-anuncio-video-form',
  templateUrl: './crear-anuncio-video-form.component.html',
  styleUrls: ['./crear-anuncio-video-form.component.css']
})
export class CrearAnuncioVideoFormComponent implements OnInit {

  public formCrearAnunciante!: FormGroup;//fromulario reactivo
  public anunciantes!: Array<Anunciante>;
  public tagsExistentes!: Array<Tag>;
  public tagsAnuncios: Array<Tag> = new Array<Tag>();

  public mensajeConfirmacion: string = "";//mensje que mostraremos al usuario si hay error o acierto
  public banderaError: boolean = false;//bandera que ayuda a indicar si hay error 
  public banderaAcierto: boolean = false;//bandera que ayuda a indicar si se crea el anunciante con exito

  constructor(private backendServiceConsultaAdministrativaService: BackendServiceConsultaAdministrativaService,
    private formBuilder: FormBuilder, private backendService: BackendService) { }

  ngOnInit(): void {
    this.formCrearAnunciante = this.formBuilder.group({//llenamos los validadores de los campos del form
      nombreAnuncio: ["", Validators.required],
      nombreAnunciante: ["", Validators.required],
      textoAnuncio: ["", Validators.required],
      link: ["", Validators.required]
    });
    //mandamos a traer todos los anunciantes
    this.backendServiceConsultaAdministrativaService.traerAnunciantes().subscribe((anunciantes: Array<Anunciante>) => {
      this.anunciantes = anunciantes;
    })
    this.backendService.traerTagsExistentes().subscribe((tags: Array<Tag>) => {
      this.tagsExistentes = tags;
    })
  }

  public guardarAnuncioDeTexto() {
    this.backendServiceConsultaAdministrativaService.guardarAnuncioVideo(this.formCrearAnunciante.value).subscribe
      ((confirmacion: string) => {
        if (confirmacion == "Se inserto el anuncio con exito.") {
          //mandamos a guardar los tags
          //creamos las TagsAnuncio a partir del Array "TagsAnuncios"
          var tagsAnunciosAMandar: Array<TagAnuncio> = new Array<TagAnuncio>();
          this.tagsAnuncios.forEach(element => {//por cada elemento del array creamos un elemento en el array "tagsRevistaAMandar"
            var nombreAnuncio: string = this.formCrearAnunciante.controls.nombreAnuncio.value;
            var nombreAnunciante: string = this.formCrearAnunciante.controls.nombreAnunciante.value;
            tagsAnunciosAMandar.push(new TagAnuncio(nombreAnuncio, nombreAnunciante, element.nombreTag));
          });
          this.backendServiceConsultaAdministrativaService.guardarTagsAnuncio(tagsAnunciosAMandar)
            .subscribe((confirmacionTags: string) => {
              confirmacion = confirmacion +" "+ confirmacionTags;
              this.mensajeConfirmacion = confirmacion;
            })
          this.banderaAcierto = true;
          this.banderaError = false;
        } else {
          this.banderaAcierto = false;
          this.banderaError = true;
          this.mensajeConfirmacion = confirmacion;
        }
      }
      );
      this.borrarCampos();
  }

  /**
  * Este metodo elimina un alemento del array TagExistetes y los transfiere al array tagsRevista
  * @param nombreTag
  */
  public deTagExistenteATagAnuncio(nombreTag: string) {
    var contador: number = 1;//este contador nos servira para maperar la posicion del objeto que queremos borrar
    this.tagsExistentes.forEach(element => {//recorrer el array con el foreach
      if (element.nombreTag == nombreTag) {//si el nombre del elemento y el del tag pulsado son iguales se tratan del mismo elemento
        this.tagsExistentes.splice(contador - 1, 1);//borramos un elemento desde una poscion antes al contador, para que sea el elemento con la poscion contador
        this.tagsAnuncios.push(element);//agregamos el elemento al array opuesto
      }
      contador++;//al final de cada iteracion sumar uno al contador
    });
  }

  /**
   * Este metodo elimina un alemento del array tagsAnuncios y los transfiere al array TagExistetes
   * @param nombreTag
   */
  public deTagAnuncioATagExistente(nombreTag: string) {
    var contador: number = 1;//este contador nos servira para maperar la posicion del objeto que queremos borrar
    this.tagsAnuncios.forEach(element => {//recorrer el array con el foreach
      if (element.nombreTag == nombreTag) {//si el nombre del elemento y el del tag pulsado son iguales se tratan del mismo elemento
        this.tagsAnuncios.splice(contador - 1, 1);//borramos un elemento desde una poscion antes al contador, para que sea el elemento con la poscion contador
        this.tagsExistentes.push(element);//agregamos el elemento al array opuesto
      }
      contador++;//al final de cada iteracion sumar uno al contador
    });
  }

  private borrarCampos(){
    this.formCrearAnunciante.controls.nombreAnuncio.setValue("");
    this.formCrearAnunciante.controls.nombreAnunciante.setValue("");
    this.formCrearAnunciante.controls.textoAnuncio.setValue("");
    this.formCrearAnunciante.controls.link.setValue("");
  }
}
