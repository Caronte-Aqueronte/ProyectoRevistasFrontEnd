import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/Modelos/tag';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-contenedor-tags-para-usuario',
  templateUrl: './contenedor-tags-para-usuario.component.html',
})
export class ContenedorTagsParaUsuarioComponent implements OnInit {
  
  public tags!: Array<Tag>;
  public mensajeDeAlerta: string = "";//string que se usara para comunicar el mensaje del backend tras una opereacion
  public banderaAlerta: boolean = false;//estas banderas serviran para ocultar o mostrar los mensajes
  public banderaError: boolean = false;//

  /**
   * Constructor de la clase
   * @param backendServise 
   */
  constructor(private backendServise: BackendService) { }
  /**
   * Este metodo se ejecuta cada que se invoca el componente, invoca al backend para traer todos los tags existentes
   * en la base de datos 
   */
  ngOnInit(): void {
    this.backendServise.traerTagsExistentes()
      .subscribe((respuesta: Array<Tag>) => {
        this.tags = respuesta;
      }
      );
  }
}
