import { BackendService } from '../../Servicios/backend.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ModeloResponseLogin } from 'src/Modelos/modelo-response-login';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html'
})
export class FormLoginComponent implements OnInit {


  public formLogin!: FormGroup;//fromulario reactivo
  public mensajeError: string = "";//mensje que mostraremos al usuario si hay error
  public banderaError: boolean = false;//bandera que ayuda a indicar si hay error de logeo o no
  constructor(private formBuilder: FormBuilder, private backendService: BackendService, private router: Router,
    private cookiesService: CookieService) {

  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      usuario: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  public hacerLogin() {
    this.backendService.mandarLogin(this.formLogin.value)
      .subscribe((modeloResponse: ModeloResponseLogin) => {
        if (modeloResponse.banderaExisteUsuario == true) {//valida la respuesta boleana del servidor
          this.banderaError = false;//hacemos false la banera para que no se muestre mensaje de error
          this.operacionesConCookies(modeloResponse);
          switch (modeloResponse.usuario.rol) {//redireccion segun rol de usuario
            case "Lector":
              this.router.navigate(['menu-lector', 'revistas']);
              break;
            case "Editor":
              this.router.navigate(['./', 'menu-editor']);
              break;
            case "Administrativo":
              this.router.navigate(['./', 'menu-lector']);
              break;

          }
        } else {//si la bandera es false entonces no existe el usuario ingresado y lanzamos error
          this.banderaError = true;
          this.mensajeError = "Usuario o contraseña invalidos, por favor verifique estos campos."
        }
      });
  }
  private operacionesConCookies(modeloResponse: ModeloResponseLogin) {
    this.cookiesService.deleteAll();
    this.cookiesService.set('Rol', modeloResponse.usuario.rol, 4, '/');
    this.cookiesService.set('Usuario', modeloResponse.usuario.usuario, 4, '/');
  }
}
