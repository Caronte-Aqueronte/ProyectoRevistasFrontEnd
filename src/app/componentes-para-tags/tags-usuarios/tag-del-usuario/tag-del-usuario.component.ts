import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TagUsuario } from 'src/Modelos/tag-usuario';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-tag-del-usuario',
  templateUrl: './tag-del-usuario.component.html',
  styleUrls: ['./tag-del-usuario.component.css']
})
export class TagDelUsuarioComponent implements OnInit {

  constructor(private backendService: BackendService, private cookiesService: CookieService) { }

  public nombreTag! : string//string que servira como no
  public banderaOcultar: boolean = false;//esta bandera indicara el estado del boton a la vista
  
  @Input() datosTag: any;
  
  ngOnInit(): void {
    this.nombreTag = this.datosTag?.nombreTag;//igualamos la variable local a la variable de la infomacion input
  }

  public eliminarTag(){
    //eliminamos la tag
    this.backendService.eliminarTagDelUsuario(new TagUsuario(this.nombreTag, this.cookiesService.get("Usuario")))
    .subscribe((confirmacion : string) =>{
     window.location.reload();
    });
  }

}
