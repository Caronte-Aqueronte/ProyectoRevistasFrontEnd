import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TagUsuario } from 'src/Modelos/tag-usuario';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-tag-existente-para-usuario',
  templateUrl: './tag-existente-para-usuario.component.html',
  styleUrls: ['./tag-existente-para-usuario.component.css']
})
export class TagExistenteParaUsuarioComponent implements OnInit {
  
  public nombreTag! : string//string que servira como no
  public banderaOcultar: boolean = false;//esta bandera indicara el estado del boton a la vista
  @Input() datosTag: any;
  
  constructor(private cookiesService: CookieService, private backendService: BackendService){

  }
  ngOnInit(): void {
    this.nombreTag = this.datosTag?.nombreTag;//igualamos la variable local a la variable de la infomacion input
  }

  public pasarTag(){
    //invocamos al backend service para que se inserte el tag en la base de datos
    this.backendService.agregarTagAlUsuario(new TagUsuario(this.nombreTag, this.cookiesService.get("Usuario")))
    .subscribe((confirmacion : string) => {
      window.location.reload();
    })

  }
}
