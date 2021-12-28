import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Anunciante } from 'src/Modelos/anunciante';
import { AnuncioImagen } from 'src/Modelos/anuncio-imagen';
import { Tag } from 'src/Modelos/tag';
import { TagAnuncio } from 'src/Modelos/tag-anuncio';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-crear-anuncio-imagen-form',
  templateUrl: './crear-anuncio-imagen-form.component.html',
  styleUrls: ['./crear-anuncio-imagen-form.component.css']
})
export class CrearAnuncioImagenFormComponent implements OnInit {

  public formCrearAnunciante!: FormGroup;//fromulario reactivo
  public anunciantes!: Array<Anunciante>;
  public tagsExistentes!: Array<Tag>;
  public tagsAnuncios: Array<Tag> = new Array<Tag>();
  public imagen: File | null = null;//este sera la imagen que servira como miniatura de la revista
  public mensajeConfirmacion: string = "";//mensje que mostraremos al usuario si hay error o acierto
  public banderaError: boolean = false;//bandera que ayuda a indicar si hay error 
  public banderaAcierto: boolean = false;//bandera que ayuda a indicar si se crea el anunciante con exito

  constructor(private backendServiceConsultaAdministrativaService: BackendServiceConsultaAdministrativaService,
    private formBuilder: FormBuilder, private backendService: BackendService) { }

  ngOnInit(): void {
    this.formCrearAnunciante = this.formBuilder.group({//llenamos los validadores de los campos del form
      nombreAnuncio: ["", Validators.required],
      nombreAnunciante: ["", Validators.required],
      texto: ["", Validators.required],
      imagen: ["", Validators.required],
    });
    //mandamos a traer todos los anunciantes
    this.backendServiceConsultaAdministrativaService.traerAnunciantes().subscribe((anunciantes: Array<Anunciante>) => {
      this.anunciantes = anunciantes;
    })
    this.backendService.traerTagsExistentes().subscribe((tags: Array<Tag>) => {
      this.tagsExistentes = tags;
    })
  }

  public guardarAnuncioDeImagen() {
    if (this.imagen != null) {
      //traemos los parametros que estan en el formulario
      var nombreAnuncio: string = this.formCrearAnunciante.controls.nombreAnuncio.value;
      var nombreAnunciante: string = this.formCrearAnunciante.controls.nombreAnunciante.value;
      var texto: string = this.formCrearAnunciante.controls.texto.value;
      //creamos un nuevo objeto AnuncioImagen a partir de las variables que extrajimos
      const anuncioImagen: AnuncioImagen = new AnuncioImagen(nombreAnunciante, nombreAnuncio, texto, this.imagen);
      this.backendServiceConsultaAdministrativaService.guardarAnuncioImagen(anuncioImagen).subscribe
        ((confirmacion: string) => {
          if (confirmacion == "Se inserto el anuncio con exito.") {
            //mandamos a guardar los tags
            //creamos las TagsAnuncio a partir del Array "TagsAnuncios"
            var tagsAnunciosAMandar: Array<TagAnuncio> = new Array<TagAnuncio>();
            this.tagsAnuncios.forEach(element => {//por cada elemento del array creamos un elemento en el array "tagsRevistaAMandar"
              tagsAnunciosAMandar.push(new TagAnuncio(nombreAnuncio, nombreAnunciante, element.nombreTag));
            });
            this.backendServiceConsultaAdministrativaService.guardarTagsAnuncio(tagsAnunciosAMandar)
              .subscribe((confirmacionTags: string) => {//mandamos a guardar todas las tags que esten dentro del array
                confirmacion = confirmacion + " " + confirmacionTags;
                this.mensajeConfirmacion = confirmacion;
              })
            //mostramos el mensaje pop
            this.banderaAcierto = true;
            this.banderaError = false;
          } else {
            this.banderaAcierto = false;
            this.banderaError = true;
            this.mensajeConfirmacion = confirmacion;
          }
        })
    } else {
      this.banderaError = true;
      this.banderaAcierto = false;
      this.mensajeConfirmacion = "Escoja un archivo valido.";
    }


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

  /**
   * Este metodo va cambiando el archivo seleccionado cada que el usuario elige otro arcivo en input file
   * @param evento 
   */
  public imagenCambiada(evento: Event) {//este metodo cambia el archivo cargado
    const files = (evento.target as HTMLInputElement).files;
    if (files != null) {
      this.imagen = files.item(0);
    }
  }
}
