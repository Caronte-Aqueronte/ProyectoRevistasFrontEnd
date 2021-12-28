import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anunciante } from 'src/Modelos/anunciante';
import { AnuncioImagen } from 'src/Modelos/anuncio-imagen';
import { CostoPorDia } from 'src/Modelos/costo-por-dia';
import { SolicitudInfoRevista } from 'src/Modelos/solicitud-info-revista';
import { Tag } from 'src/Modelos/tag';
import { TagAnuncio } from 'src/Modelos/tag-anuncio';

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

  public guardarAnuncioDeTexto(anuncio: any): Observable<string>{
    let headers = new HttpHeaders().set('Accion', 'guardarAnuncioTexto');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<string>(this.API_URL + "ConstroladorConsultaAdminstrativa", anuncio, options);
  }

  public guardarTagsAnuncio(tags: Array<TagAnuncio>): Observable<string>{
    let headers = new HttpHeaders().set('Accion', 'guardarTagsAnuncio');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<string>(this.API_URL + "ConstroladorConsultaAdminstrativa", tags, options);
  }

  public guardarAnuncioImagen(anuncio: AnuncioImagen): Observable<string>{
    const formData: FormData = new FormData;//este sera el objeto que guardara la informacion del form (con la imagen)
    formData.append("texto", anuncio.textoAnuncio); //guardamos el texto del anuncio
    formData.append("imagen", anuncio.imagen); //guardamos la imagen del anuncio
    formData.append("nombreAnuncio", anuncio.nombreAnuncio); //guardamos el nombreAnuncio del anuncio
    formData.append("nombreAnunciante", anuncio.nombreAnunciante); //guardamos el nombreAnunciante del anuncio
    let headers = new HttpHeaders().set('Accion', 'guardarAnuncioImagen');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<string>(this.API_URL + "ConstroladorConsultaAdminstrativa", formData, options);
  }
  public guardarAnuncioVideo(anuncio: any): Observable<string>{
    let headers = new HttpHeaders().set('Accion', 'guardarAnuncioVideo');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<string>(this.API_URL + "ConstroladorConsultaAdminstrativa", anuncio, options);
  }
}
