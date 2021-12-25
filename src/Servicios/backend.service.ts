import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModeloResponseLogin } from 'src/Modelos/modelo-response-login';
import { ModeloPerfil } from 'src/Modelos/modelo-perfil';
import { Tag } from 'src/Modelos/tag';
import { TagUsuario } from 'src/Modelos/tag-usuario';
import { Categoria } from 'src/Modelos/categoria';
import { Revista } from 'src/Modelos/revista';
import { TagRevista } from 'src/Modelos/tag-revista';
import { ConsultaSuscripcion } from 'src/Modelos/consulta-suscripcion';
import { ResumenDeRevista } from 'src/Modelos/resumen-de-revista';
import { SolicitudInfoRevista } from 'src/Modelos/solicitud-info-revista';
import { Suscripcion } from 'src/Modelos/suscripcion';
import { InteraccionConRevista } from 'src/Modelos/interaccion-con-revista';
import { Comentario } from 'src/Modelos/comentario';
import { Pago } from 'src/Modelos/pago';
import { Card } from 'src/Modelos/card';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  readonly API_URL = "http://localhost:8080/revistas-app-api/";

  constructor(private httpClient: HttpClient) { }

  /**
   * Este metodo se comunica con la api mandandole el usuario que se logeo, espera una respuesta boolean
   * que indica si el usuario existe o no existe
   * @param usuario 
   * @returns 
   */
  public mandarLogin(usuario: any): Observable<ModeloResponseLogin> {
    return this.httpClient.post<ModeloResponseLogin>(this.API_URL + "ControladorLogin", usuario);
  }

  /**
   * Este metodo manda a la api un usuario 
   * @param usuario 
   * @returns 
   */
  public mandarNuevoUsuario(usuario: any): Observable<string> {
    return this.httpClient.post<string>(this.API_URL + "ControladorCrearUsuario", usuario);
  }

  /**
   * Manda el nombre del usuario que esta registrado y espera un modelo de perfil
   * @param nombreUsuario 
   * @returns 
   */
  public traerPerfil(nombreUsuario: string): Observable<ModeloPerfil> {
    let headers = new HttpHeaders().set('Accion', 'retornarPerfil');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<ModeloPerfil>(this.API_URL + "ControladorPerfil", nombreUsuario, options);
  }

  public mandarPerfil(perfil: any): Observable<string> {
    let headers = new HttpHeaders().set('Accion', 'guardarPerfil');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<string>(this.API_URL + "ControladorPerfil", perfil, options);
  }

  public actulizarFotoPerfil(fotoPerfil: File, nombreUsuario: string): Observable<string> {
    const formData: FormData = new FormData;
    formData.append("datafile", fotoPerfil, fotoPerfil.name);
    formData.append("nombreUsuario", nombreUsuario);
    return this.httpClient.post<string>(this.API_URL + "ControladorSubirFoto", formData);
  }

  public traerTagsExistentes(): Observable<Array<Tag>> {
    return this.httpClient.post<Array<Tag>>(this.API_URL + "ControladorRetornarTags", "");
  }

  /**
   * Este metodo se comunica con la api, le manda el nombre del usuario logeado y devuelve todas
   * las tags del usuario en cuestion.
   * @param nombreUsuario
   * @returns 
   */
  public traerTagsDeUnUsuario(nombreUsuario: string): Observable<Array<Tag>> {
    let headers = new HttpHeaders().set('Accion', 'retornarTagsDelUsuario');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<Array<Tag>>(this.API_URL + "ControladorTagsDelUsuario", nombreUsuario, options);
  }

  /**
   * Este metodo se comunica con la api y manda a eliminar el tag y usuario en cuestion
   * @param tagUsuario 
   * @returns 
   */
  public eliminarTagDelUsuario(tagUsuario: TagUsuario): Observable<string> {
    let headers = new HttpHeaders().set('Accion', 'eliminarTag');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<string>(this.API_URL + "ControladorTagsDelUsuario", tagUsuario, options);
  }

  /**
   * Este metodo se comunica con la api y manda a eliminar el tag y usuario en cuestion
   * @param tagUsuario 
   * @returns 
   */
  public agregarTagAlUsuario(tagUsuario: TagUsuario): Observable<string> {
    let headers = new HttpHeaders().set('Accion', 'agregarNuevoTag');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<string>(this.API_URL + "ControladorTagsDelUsuario", tagUsuario, options);
  }

  /**
   * Este metodo se comunica con la api para traer todas las categorias disponibles en la bdF
   */
  public traerCategorias(): Observable<Array<Categoria>> {
    let headers = new HttpHeaders().set('Accion', 'devolverCategorias');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    return this.httpClient.post<Array<Categoria>>(this.API_URL + "ControladorAccionRevista", "", options);
  }

  /**
   * Este metodo recibe un objeto Revista y apartir de sus atributos adjunta todo al formData que va a recibir el api
   * para que guarde la revista en la base de datos
   * @param revista 
   * @returns 
   */
  public subirRevista(revista: Revista): Observable<string> {
    const formData: FormData = new FormData;//este sera el objeto que guardara la infomacion de la revista (incluido el pdf)
    //guardamos todos los atributos de la Revista en el formData
    formData.append("nombreRevista", revista.nombreRevista); //guardamos el nombre de la revista
    formData.append("descripcion", revista.descripcion); //guardamos el nombre de la revista
    formData.append("categoria", revista.categoria); //guardamos la categoria
    formData.append("datafilePdf", revista.contenido, revista.contenido.name);//guardamos el archivo .pdf de la revista
    formData.append("datafileMiniatura", revista.miniatura, revista.miniatura.name);//guardamos el archivo .pdf de la revista
    formData.append("costoDeSuscripcion", revista.costoDeSuscripcion); //guardamos el costoDeSuscripcion de la revista
    formData.append("estadoSuscripcion", revista.estadoSuscripcion); //guardamos el estadoSuscripcion de la revista
    formData.append("estadoComentarios", revista.estadoComentarios); //guardamos el estadoComentarios de la revista
    formData.append("estadoLikes", revista.estadoLikes); //guardamos el estadoLikes de la revista
    formData.append("fechaDePublicacion", revista.fechaDePublicacion); //guardamos el fechaDePublicacion de la revista
    formData.append("usuarioCreador", revista.usuarioCreador); //guardamos el usuarioCreador de la revista
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'surbirRevista');//agregamos el header que indica que accion realizara la api
    let options = { headers: headers };
    //mndamos el formData a la api en el servlet correspondiente y retornamos su respuesta
    return this.httpClient.post<string>(this.API_URL + "ControladorSubirRevista", formData, options);
  }

  /**
   * Este metodo envia un post al servidor con todas las tags que el usuario eleigio para su revista. 
   * Esto con la intencion de guardarla en la base de datos
   * @param tags 
   * @returns 
   */
  public guardarTagsDeRevista(tags: Array<TagRevista>): Observable<string> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'guardarTags');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<string>(this.API_URL + "ControladorAccionRevista", tags, options);
  }

  /**
   * Este metodo envia un post al servidor y con el header ¨Accion¨ indica que es lo se debe hacer.
   * Esto con la intencion de devolver una recomendacion de revistas aleatoria
   * @param nombreUsuario 
   * @returns 
   */
  public recomendarRevistas(nombreUsuario: string): Observable<Array<Card>> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'recomendarRevistas');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<Array<Card>>(this.API_URL + "ControladorAccionRevista", nombreUsuario, options);
  }
  
  /**
   * Se comunica con el api en la espera de traer todas las revistas en la bd
   * @returns 
   */
  public traerTodasLasRevistas(): Observable<Array<Card>> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'traerTodasLasRevistas');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<Array<Card>>(this.API_URL + "ControladorAccionRevista", "", options);
  }
  /**
   * Este metodo envia un post con un header accion que indica lo que el servidor debe hace, ademas adjunta
   * un string que representa la busqueda que realizo el usuario
   * @param busqueda 
   * @returns 
   */
  public buscarPorCategoria(busqueda: string): Observable<Array<Card>> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'buscarPorCategoria');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<Array<Card>>(this.API_URL + "ControladorAccionRevista", busqueda, options);
  }

  /**
   * Este metodo envia un post con un header accion que indica lo que el servidor debe hace, ademas adjunta
   * un string que representa la busqueda que realizo el usuario
   * @param busqueda 
   * @returns 
   */
  public buscarPorTag(busqueda: string): Observable<Array<Card>> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'buscarPorTag');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<Array<Card>>(this.API_URL + "ControladorAccionRevista", busqueda, options);
  }

  /**
   * Este metodo se comunica con el backend para traer las cards de las revistas a las cuales esta suscrito el usuario
   * @param nombreUsuario 
   * @returns 
   */
  public verSuscripciones(nombreUsuario: string): Observable<Array<Card>> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'verSuscripciones');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<Array<Card>>(this.API_URL + "ControladorAccionRevista", nombreUsuario, options);
  }

  public verSiUsuarioEstaSuscritoARevista(consulta: ConsultaSuscripcion): Observable<boolean> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'verSuscripcion');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<boolean>(this.API_URL + "ControladorAccionRevista", consulta, options);
  }

  /**
   * Este metodo se comunica con la api por medio de un post al servlet correspondiente con la intencion de obtener
   * la descripcion de la revista especificada en el objeto que recibe como parametro
   * @param revista 
   * @returns 
   */
  public obtenerInfoDeRevista(revista: SolicitudInfoRevista): Observable<ResumenDeRevista> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'infoRevista');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<ResumenDeRevista>(this.API_URL + "ControladorAccionRevista", revista, options);
  }

  /**
   * Este metodo se comunica con la api por medio de un post al servlet correspondiente con la intencion de obtener
   * las tags de una revista
   * @param infoRevista
   * @returns 
   */
  public traerTagsDeUnaRevista(infoRevista: SolicitudInfoRevista): Observable<Array<Tag>> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'tagsRevista');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<Array<Tag>>(this.API_URL + "ControladorAccionRevista", infoRevista, options);
  }

  public suscribirseARevista(suscripcion: Suscripcion): Observable<string> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'suscribirse');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<string>(this.API_URL + "ControladorAccionRevista", suscripcion, options);
  }

  /**
   * Este metodo se comunida con el backend y le manda la info de una revista en la espera de un numero que representa 
   * el costo de suscripcion a la revista especificada
   * @param info 
   * @returns 
   */
  public saberCostoDeSuscripcion(info: SolicitudInfoRevista): Observable<number> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'costoRevista');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<number>(this.API_URL + "ControladorAccionRevista", info, options);
  }

  /**
   * Se comunica con el backend y envia la info de una rvista para saber el estado de suscripciones, comenarios y likes
   * @param info 
   * @returns 
   */
  public saberEstadoDeInteraccionesConRevista(info: SolicitudInfoRevista): Observable<InteraccionConRevista> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'saberEstadoDeInteraccionesConRevista');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<InteraccionConRevista>(this.API_URL + "ControladorAccionRevista", info, options);
  }

  /**
   * Se comunica con el backend y envia la info de una rvista para saber el estado de suscripciones, comenarios y likes
   * @param info 
   * @returns 
   */
  public darMeGustaARevista(info: SolicitudInfoRevista): Observable<string> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'darLike');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<string>(this.API_URL + "ControladorAccionRevista", info, options);
  }
  /**
   * Se comunica con el backend enviandole un comentario en la espera de una confirmacion o un recahzo
   * @param comentario 
   * @returns 
   */
  public hacerComentario(comentario: Comentario): Observable<string> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'hacerComentario');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<string>(this.API_URL + "ControladorAccionRevista", comentario, options);
  }

  public traerComentariosDeUnaRevista(info: SolicitudInfoRevista): Observable<Array<Comentario>> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'traerComentarios');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<Array<Comentario>>(this.API_URL + "ControladorAccionRevista", info, options);
  }

  public realizarPago(pago: Pago): Observable<string> {
    //guardamos el header para indicar que accion debera relizar el backend
    let headers = new HttpHeaders().set('Accion', 'realizarPago');
    let options = { headers: headers };
    //retornamos la respuesta que recibamos del backend
    return this.httpClient.post<string>(this.API_URL + "ControladorAccionRevista", pago, options);

  }

}
