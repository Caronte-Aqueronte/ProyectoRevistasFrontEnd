import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html'
})
export class CrearUsuarioComponent implements OnInit {

  public formCrearUsuario!: FormGroup;//fromulario reactivo
  public mensajeError: string = "";//mensje que mostraremos al usuario si hay error
  public banderaError: boolean = false;//bandera que ayuda a indicar si hay error de logeo o no

  constructor(private formBuilder: FormBuilder, private router: Router, private cookiesService: CookieService,
    private backendService: BackendService) { }

  ngOnInit(): void {
    this.formCrearUsuario = this.formBuilder.group({
      usuario: ["", Validators.required],
      password: ["", Validators.required],
      rol: ["", Validators.required]
    });
  }
  public crearPerfil() {
    this.backendService.mandarNuevoUsuario(this.formCrearUsuario.value)
      .subscribe((confirmacion: string) => {
        if (confirmacion == "Se registro el nuevo usuario") {
          this.banderaError = false;
          this.operaciondesDeCookies();
          switch (this.cookiesService.get("Rol")) {
            case "Lector":
              this.router.navigate(['menu-lector/', 'editar-perfil']);
              break;
            case "Editor":
              this.router.navigate(['menu-editor/', 'editar-perfil']);
              break;
            case "Administrativo":
              this.router.navigate(['menu-administrativo/', 'editar-perfil']);
              break;
          }
        } else {
          this.banderaError = true;
          this.mensajeError = confirmacion;
        }
      });
  }
  private operaciondesDeCookies() {
    this.cookiesService.deleteAll();
    this.cookiesService.set('Rol', this.formCrearUsuario.value.rol, 4, '/');
    this.cookiesService.set('Usuario', this.formCrearUsuario.value.usuario, 4, '/');
  }
}
