import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/Modelos/card';
import { InteraccionesRequest } from 'src/Modelos/interacciones-request';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceConsultaUsuarioEditorService {
  readonly API_URL = "http://localhost:8080/revistas-app-api/";
  constructor(private httpClient: HttpClient) { }

  /**
  * Manda el nombre de un usuario editor para que se muestren todas las revistas que sean de el
  * @param nombreUsuario 
  * @returns 
  */
  public traerTodasLasRevistasDeEditor(nombreUsuario: string): Observable<Array<Card>> {
    let headers = new HttpHeaders().set('Accion', 'verRevistas');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<Array<Card>>(this.API_URL + "ControladorConsulaUsuarioEditor", nombreUsuario, options);
  }

    /**
  * Manda el nombre de un usuario editor para que se muestren todas las revistas que sean de el
  * @param nombreUsuario 
  * @returns 
  */
     public guardarConfiguracion(interacciones: InteraccionesRequest): Observable<string> {
      let headers = new HttpHeaders().set('Accion', 'cambiarInteracciones');//agregamos el header que indica que accion realizara la api
      let options = { headers: headers };
      return this.httpClient.post<string>(this.API_URL + "ControladorConsulaUsuarioEditor", interacciones, options);
    }
}
