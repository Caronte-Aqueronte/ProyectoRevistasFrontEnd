import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anunciante } from 'src/Modelos/anunciante';
import { CostoPorDia } from 'src/Modelos/costo-por-dia';
import { SolicitudInfoRevista } from 'src/Modelos/solicitud-info-revista';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceConsultaAdministrativaService {

  readonly API_URL = "http://localhost:8080/revistas-app-api/";

  constructor(private httpClient: HttpClient) { }

  public asignarCostoPorDia(costoPorDia: CostoPorDia): Observable<string> {
    let headers = new HttpHeaders().set('Accion', 'asignarCostoPorDia');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<string>(this.API_URL + "ConstroladorConsultaAdminstrativa", costoPorDia, options);
  }

  public traerCostoPorDia(info: SolicitudInfoRevista): Observable<number> {
    let headers = new HttpHeaders().set('Accion', 'verCostoPorDia');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<number>(this.API_URL + "ConstroladorConsultaAdminstrativa", info, options);
  }

  public guardarAnunciante(anunciante: Anunciante): Observable<string> {
    let headers = new HttpHeaders().set('Accion', 'crearAnunciante');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<string>(this.API_URL + "ConstroladorConsultaAdminstrativa", anunciante, options);
  }

  public traerAnunciantes(): Observable<Array<Anunciante>>{
    let headers = new HttpHeaders().set('Accion', 'traerAnunciantes');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<Array<Anunciante>>(this.API_URL + "ConstroladorConsultaAdminstrativa", "", options);
  }
}
