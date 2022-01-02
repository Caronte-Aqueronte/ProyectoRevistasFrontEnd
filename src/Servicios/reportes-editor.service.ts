import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesEditorService {

  readonly API_URL = "http://localhost:8080/revistas-app-api/ControladorReportesEditor";

  constructor(private httpClient: HttpClient) { }

  public reporteComentarios(nombreRevista: string, nombreUsuarioCreador: string, primeraFecha: string, segundaFecha: string) : Observable<any>{
    const params = new HttpParams().set('tipoReporte', "reporteComentarios").set('nombreRevista', nombreRevista)
      .set('primeraFecha', primeraFecha).set('segundaFecha', segundaFecha);
    return this.httpClient.get(this.API_URL, {responseType:'blob',params: params});
  }
}
