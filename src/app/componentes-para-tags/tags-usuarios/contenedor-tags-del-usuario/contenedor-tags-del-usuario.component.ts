import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Tag } from 'src/Modelos/tag';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-contenedor-tags-del-usuario',
  templateUrl: './contenedor-tags-del-usuario.component.html',
})
export class ContenedorTagsDelUsuarioComponent implements OnInit {

  tagsDelUsuario!: Array<Tag>//tags que mandaremos para representrarlos graficamente

  constructor(private backendService: BackendService, private cookiesService: CookieService) { }

  ngOnInit(): void {//mandamos a traer todos los tags del usuario
    this.backendService.traerTagsDeUnUsuario(this.cookiesService.get("Usuario")/*mandamos el nombre del usuario de la ccokie*/)
      .subscribe((tagsDelUsuario: Array<Tag>) => {
        this.tagsDelUsuario = tagsDelUsuario;//igualamos los tags para poder mandarlos a representarlos graficamente
      })
  }
}
