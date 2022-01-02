import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReportesEditorService } from 'src/Servicios/reportes-editor.service';

@Component({
  selector: 'app-reportes-editor',
  templateUrl: './reportes-editor.component.html',
  styleUrls: ['./reportes-editor.component.css']
})
export class ReportesEditorComponent implements OnInit {

  constructor(private reporteService: ReportesEditorService, private cookiesService: CookieService) { }

  ngOnInit(): void {
  }

  public reporteComentarios() {
    var nombreRevista: string = ((document.getElementById("revistaBusqueda") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    var primeraFecha :string = ((document.getElementById("primeraFecha") as HTMLInputElement)).value;//valor de la primera fecha
    var segundaFecha :string = ((document.getElementById("segundaFecha") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    window.open("http://localhost:8080/revistas-app-api/ControladorReportesEditor?tipoReporte=reporteComentarios&nombreRevista="+nombreRevista+"&primeraFecha="+primeraFecha+"&segundaFecha="+segundaFecha);
   // this.reporteService.reporteComentarios("", "", "2021-12-16", "2021-12-22  ").subscribe();
  }
  
  public reporteSuscripciones(){
    var nombreRevista: string = ((document.getElementById("revistaBusqueda") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    var primeraFecha :string = ((document.getElementById("primeraFecha") as HTMLInputElement)).value;//valor de la primera fecha
    var segundaFecha :string = ((document.getElementById("segundaFecha") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    window.open("http://localhost:8080/revistas-app-api/ControladorReportesEditor?tipoReporte=reporteSuscripciones&nombreRevista="+nombreRevista+"&primeraFecha="+primeraFecha+"&segundaFecha="+segundaFecha);
  }

  public reporteMasLikes(){
    var nombreRevista: string = ((document.getElementById("revistaBusqueda") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    var primeraFecha :string = ((document.getElementById("primeraFecha") as HTMLInputElement)).value;//valor de la primera fecha
    var segundaFecha :string = ((document.getElementById("segundaFecha") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    window.open("http://localhost:8080/revistas-app-api/ControladorReportesEditor?tipoReporte=reporteLikes&nombreRevista="+nombreRevista+"&primeraFecha="+primeraFecha+"&segundaFecha="+segundaFecha);
  }
  public reporteDeGanancias(){
    var nombreRevista: string = ((document.getElementById("revistaBusqueda") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    var primeraFecha :string = ((document.getElementById("primeraFecha") as HTMLInputElement)).value;//valor de la primera fecha
    var segundaFecha :string = ((document.getElementById("segundaFecha") as HTMLInputElement)).value;//nombre de la busqueda a filtrar
    var nombreUsuarioCreador: string = this.cookiesService.get('Usuario');
    window.open("http://localhost:8080/revistas-app-api/ControladorReportesEditor?tipoReporte=reporteGanancias&usuarioCreador="+nombreUsuarioCreador+"&nombreRevista="+nombreRevista+"&primeraFecha="+primeraFecha+"&segundaFecha="+segundaFecha);
  }

}
