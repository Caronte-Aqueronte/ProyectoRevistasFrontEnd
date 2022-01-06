import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from 'src/Modelos/comentario';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {
  @Input() datosComentario!: Comentario;
  public urlFotoPerfil: string = "http://localhost:8080/revistas-app-api/ControladorSubirFoto"
  constructor() { }

  ngOnInit(): void {
    this.urlFotoPerfil += "?nombreUsuario=" + this.datosComentario.nombreUsuarioComentador;
  }

}
