import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SolicitudInfoRevista } from 'src/Modelos/solicitud-info-revista';
import { Suscripcion } from 'src/Modelos/suscripcion';
import { BackendService } from 'src/Servicios/backend.service';

@Component({
  selector: 'app-suscripcion-form',
  templateUrl: './suscripcion-form.component.html',
  styleUrls: ['./suscripcion-form.component.css']
})
export class SuscripcionFormComponent implements OnInit {

  public formSuscripcion!: FormGroup;//fromulario reactivo
  public nombreRevista!: string | null;//variables que se enviaran
  public nombreUsuarioCreador!: string | null;//
  public costoPorSuscripcion!: number;//
  public costoPorSuscripcionAMostrar!: number;//
  public metodoPago: string = "";
  public banderaError: boolean = false;
  public mensajeDeAlerta: string = "";
  private nombreUsuario!: string;
  constructor(private formBuilder: FormBuilder, private backendService: BackendService, private cookiesService: CookieService
    , private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.nombreUsuario = this.cookiesService.get('Usuario');//obtenemos el nombre del usuario
    this.nombreRevista = this.route.snapshot.paramMap.get("nombreRevista");
    this.nombreUsuarioCreador = this.route.snapshot.paramMap.get("usuarioCreador");
    this.formSuscripcion = this.formBuilder.group({//llenamos los validadores de los campos del form
      metodo: ["", Validators.required],
      fecha: ["", Validators.required]
    });
    if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {
      //traemos el costo de suscripcion de la revista
      this.backendService.saberCostoDeSuscripcion(new SolicitudInfoRevista(this.nombreRevista, this.nombreUsuarioCreador)).subscribe
        ((costo: number) => {
          this.costoPorSuscripcion = costo;
          this.costoPorSuscripcionAMostrar = this.costoPorSuscripcion;
        })
    }
  }
  public suscribirse() {
    if (this.nombreRevista != null && this.nombreUsuarioCreador != null) {
      this.backendService.suscribirseARevista(new Suscripcion(this.nombreUsuario, this.nombreRevista
        , this.nombreUsuarioCreador, this.metodoPago, this.formSuscripcion.get('fecha')?.value)).subscribe
        ((confirmacion : string)=> {
          if(confirmacion == "Se registro tu suscripcion con exito."){
            this.router.navigate(['menu-lector/revista', this.nombreRevista, this.nombreUsuarioCreador]);
          }else{
            this.banderaError = true;
            this.mensajeDeAlerta = confirmacion;
          }
        })
    }
  }
  public cambioDeMetodo() {
    if (this.metodoPago == "Anual") {
      this.costoPorSuscripcionAMostrar = this.costoPorSuscripcion * 12;
    } else if (this.metodoPago == "Mensual") {
      this.costoPorSuscripcionAMostrar = this.costoPorSuscripcion;
    }
  }
}
