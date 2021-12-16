import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Revista } from 'src/Modelos/revista';
import { Tag } from 'src/Modelos/tag';
import { TagRevista } from 'src/Modelos/tag-revista';
import { BackendService } from 'src/Servicios/backend.service';
import { Categoria } from '../../Modelos/categoria';

@Component({
  selector: 'app-form-subir-revistas',
  templateUrl: './form-subir-revistas.component.html',
  styleUrls: ['./form-subir-revistas.component.css']
})
export class FormSubirRevistasComponent implements OnInit {

  public formSubirRevista!: FormGroup;//fromulario reactivo
  public archivoPdf: File | null = null;//este sera el archivo que se mandara al backend
  public miniatura: File | null = null;//este sera la imagen que servira como miniatura de la revista
  public categorias!: Array<Categoria>; //array de donde se guardaran las categorias existentes de la bd
  public banderaError: boolean = false;//banderas que serviran para mostrar las cajas de alertas
  public banderaAceptacion: boolean = false;//
  public mensajeDeAlerta: string = "";//mensaje que contendra las casjas de alerta
  public tagsExistentes!: Array<Tag>; //tags que podran seleccionarse para un 
  public tagsRevista = new Array<Tag>();//Tags que se convertiran en tags para la revista
  public tagsRevistaAMandar = new Array<TagRevista>();//Estas son las tags que se guardaran a la revista
  constructor(private formBuilder: FormBuilder, private backendService: BackendService, private cookiesService: CookieService) { }

  ngOnInit(): void {
    this.formSubirRevista = this.formBuilder.group({//llenamos los validadores de los campos del form
      nombreRevista: ["", Validators.required],
      categoria: ["", Validators.required],
      revista: ["", Validators.required],
      fechaDePublicacion: ["", Validators.required],
      costoDeSuscripcion: ["", Validators.required],
      estadoSuscripcion: ["", Validators.required],
      estadoComentarios: ["", Validators.required],
      estadoLikes: ["", Validators.required],
      miniatura: ["", Validators.required],
      descripcionRevista: ["", Validators.required],
    });
    //mandamos a traer todas las categorias presentes en la base de datos
    this.backendService.traerCategorias()
      .subscribe((categorias: Array<Categoria>) => {
        this.categorias = categorias;
      })
    //mandamos a trar todas las tags existentes
    this.backendService.traerTagsExistentes().subscribe
      ((tagsTraidas: Array<Tag>) => {
        this.tagsExistentes = tagsTraidas;
      })
  }

  /**
   * Este metodo construye un objeto Revista a partir de los parametros del form que se presenta en el html, ademas
   * construye un array de tagsRevista para asignarle las tags a la revista. Por ultimo manda a guardar la revista y los tags a la
   * base de datos por medio del api.
   */
  public subirRevista() {
    if (this.archivoPdf != null && this.miniatura != null) {//vemos que el archivo no sea nulo
      //construimos un objeto Revista a partir de la infomacion del usuario
      var nombreRevista: string = this.formSubirRevista.get('nombreRevista')?.value;
      var categoria: string = this.formSubirRevista.get('categoria')?.value;
      var costoDeSuscripcion: string = this.formSubirRevista.get('costoDeSuscripcion')?.value;
      var estadoSuscripcion: string = this.formSubirRevista.get('estadoSuscripcion')?.value;
      var estadoComentarios: string = this.formSubirRevista.get('estadoComentarios')?.value;
      var estadoLikes: string = this.formSubirRevista.get('estadoLikes')?.value;
      var fechaDePublicacion: string = this.formSubirRevista.get('fechaDePublicacion')?.value;
      var usuarioCreador: string = this.cookiesService.get('Usuario');
      var descripcion: string = this.formSubirRevista.get('descripcionRevista')?.value;
      //creamos las TagsRevista a partir del Array "tagsRevista"
      this.tagsRevista.forEach(element => {//por cada elemento del array creamos un elemento en el array "tagsRevistaAMandar"
        this.tagsRevistaAMandar.push(new TagRevista(nombreRevista, usuarioCreador, element.nombreTag));
      });
      //creamos el objeto a partir de las variables guardadas
      var revista: Revista = new Revista(nombreRevista, categoria, this.archivoPdf, costoDeSuscripcion
        , estadoSuscripcion, estadoComentarios, estadoLikes, fechaDePublicacion, usuarioCreador,
         descripcion, this.miniatura);
      //mandamos a publicar la revista
      this.backendService.subirRevista(revista)
        .subscribe((confirmacion: string) => {
          //revisar si el mensaje de confirmacion es afirmativo para mandar a guardar los tags
          if(confirmacion == "Se publico tu revista \"" + nombreRevista + "\" con exito."){
            this.backendService.guardarTagsDeRevista(this.tagsRevistaAMandar).subscribe
            ((confirmacionTags : string) => {
              confirmacion += "\n"+ confirmacionTags;
              this.mensajeDeAlerta = confirmacion;
            });
            //mostramos el mensaje de confirmacion          
            this.banderaAceptacion = true;
            this.banderaError = false;
          }else{//si el mensjae no es exitoso entonces mostramos el error
            this.mensajeDeAlerta = confirmacion;
            this.banderaError = true;
            this.banderaAceptacion = false;
          }
        })
    } else {//si es nulo lanzamos una confrmacion
      this.mensajeDeAlerta = "Seleccione un archivo valido para cargar";
      this.banderaError = true;
      this.banderaAceptacion = false;
    }
  }

  /**
   * Este metodo va cambiando el archivo seleccionado cada que el usuario elige otro arcivo en input file
   * @param evento 
   */
  public archivoCambiado(evento: Event) {//este metodo cambia el archivo cargado
    const files = (evento.target as HTMLInputElement).files;
    if (files != null) {
      this.archivoPdf = files.item(0);
    }
  }
 /**
   * Este metodo va cambiando el archivo seleccionado cada que el usuario elige otro arcivo en input file
   * @param evento 
   */
  public miniaturaCambiada(evento: Event) {//este metodo cambia el archivo cargado
    const files = (evento.target as HTMLInputElement).files;
    if (files != null) {
      this.miniatura = files.item(0);
    }
  }
  /**
   * Este metodo elimina un alemento del array TagExistetes y los transfiere al array tagsRevista
   * @param nombreTag
   */
  public deTagExistenteATagRevista(nombreTag: string) {
    var contador: number = 1;//este contador nos servira para maperar la posicion del objeto que queremos borrar
    this.tagsExistentes.forEach(element => {//recorrer el array con el foreach
      if (element.nombreTag == nombreTag) {//si el nombre del elemento y el del tag pulsado son iguales se tratan del mismo elemento
        this.tagsExistentes.splice(contador - 1, 1);//borramos un elemento desde una poscion antes al contador, para que sea el elemento con la poscion contador
        this.tagsRevista.push(element);//agregamos el elemento al array opuesto
      }
      contador++;//al final de cada iteracion sumar uno al contador
    });
  }

  /**
   * Este metodo elimina un alemento del array tagsRevista y los transfiere al array TagExistetes
   * @param nombreTag
   */
  public deTagRevistaATagExistente(nombreTag: string) {
    var contador: number = 1;//este contador nos servira para maperar la posicion del objeto que queremos borrar
    this.tagsRevista.forEach(element => {//recorrer el array con el foreach
      if (element.nombreTag == nombreTag) {//si el nombre del elemento y el del tag pulsado son iguales se tratan del mismo elemento
        this.tagsRevista.splice(contador - 1, 1);//borramos un elemento desde una poscion antes al contador, para que sea el elemento con la poscion contador
        this.tagsExistentes.push(element);//agregamos el elemento al array opuesto
      }
      contador++;//al final de cada iteracion sumar uno al contador
    });
  }
}
