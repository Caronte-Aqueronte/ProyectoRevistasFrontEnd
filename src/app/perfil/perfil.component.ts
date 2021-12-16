import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModeloPerfil } from 'src/Modelos/modelo-perfil';
import { Tag } from 'src/Modelos/tag';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public nombreEditor!: string | null;
  public perfil!: ModeloPerfil;
  public tagsUsuario!: Array<Tag>;
  public urlFoto: string = "http://localhost:8080/revistas-app-api/ControladorSubirFoto";

  constructor(private route: ActivatedRoute, private backendService : BackendService) { }

  ngOnInit(): void {
    this.nombreEditor = this.route.snapshot.paramMap.get("nombreUsuario");//obtenemos el nombre del usuario del perfil
    this.urlFoto += "?nombreUsuario=" + this.nombreEditor;//mandamos a traer la foto de perfil de usuario del usuari0o que coincida con el nombre
    if(this.nombreEditor != null){//si el nombre no es nulo entonces traemos el perfil
      this.backendService.traerPerfil(this.nombreEditor).subscribe
      ((pefilDelUsuario: ModeloPerfil) => {
        this.perfil = pefilDelUsuario;
      })
      this.backendService.traerTagsDeUnUsuario(this.nombreEditor).subscribe
      ((tags: Array<Tag>)=>{
        this.tagsUsuario = tags;
      })
    }
  }
}
