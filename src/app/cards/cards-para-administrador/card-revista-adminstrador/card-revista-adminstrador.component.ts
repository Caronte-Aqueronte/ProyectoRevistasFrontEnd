import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/Modelos/card';

@Component({
  selector: 'app-card-revista-adminstrador',
  templateUrl: './card-revista-adminstrador.component.html',
  styleUrls: ['./card-revista-adminstrador.component.css']
})
export class CardRevistaAdminstradorComponent implements OnInit {
  
  @Input() datosCard!: Card;

  public url: string = "http://localhost:8080/revistas-app-api/ControladorAccionRevista";
  public nombreRevista!: string;//nombre de la revista que sera representada en el html
  public descripcion!: string;//descripcion de la revista que sera representada en el html
  public categoria!: string;
  public usuarioCreador!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.url += "?accion=traerCaratula&nombreRevista=" + this.datosCard?.nombreRevista + "&usuarioCreador=" + this.datosCard?.usuarioCreador;
    this.nombreRevista = this.datosCard?.nombreRevista;
    this.descripcion = this.datosCard?.descripcion;
    this.categoria = this.datosCard?.categoria;
    this.usuarioCreador = this.datosCard?.usuarioCreador;
  }

  public redirigirAAsignacionDeCosto(){
    this.router.navigate(['menu-administrativo/costo/', this.nombreRevista, this.usuarioCreador]);//navegamos hacia el componente resumen y le pasamos el nombre de la revista
  }

}
