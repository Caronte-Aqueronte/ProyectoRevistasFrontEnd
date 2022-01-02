import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes-administrativos',
  templateUrl: './reportes-administrativos.component.html',
  styleUrls: ['./reportes-administrativos.component.css']
})
export class ReportesAdministrativosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public gananciasPorRevistas(){
    var nombreRevista: string = ((document.getElementById("nombreRevista") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    var primeraFecha :string = ((document.getElementById("primeraFecha") as HTMLInputElement)).value;//valor de la primera fecha
    var segundaFecha :string = ((document.getElementById("segundaFecha") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    var nombreUsuarioCreador: string = ((document.getElementById("usuarioCreador") as HTMLInputElement)).value;
    window.open("http://localhost:8080/revistas-app-api/ControladorReporteAdministrativo?tipoReporte=Ganancias&usuarioCreador="+nombreUsuarioCreador+"&nombreRevista="+nombreRevista+"&primeraFecha="+primeraFecha+"&segundaFecha="+segundaFecha);
  }

  public gananciasPorAnuncios(){
    var nombreAnunciante : string = ((document.getElementById("nombreAnunciante") as HTMLInputElement)).value;
    var primeraFecha :string = ((document.getElementById("primeraFechaAnunciante") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    var segundaFecha: string = ((document.getElementById("segundaFechaAnunciante") as HTMLInputElement)).value;
    window.open("http://localhost:8080/revistas-app-api/ControladorReporteAdministrativo?tipoReporte=gananciasAnuncios&nombreAnunciante="+nombreAnunciante+"&primeraFecha="+primeraFecha+"&segundaFecha="+segundaFecha);
  }
}
