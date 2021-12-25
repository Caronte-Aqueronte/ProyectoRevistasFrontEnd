export class InteraccionesRequest {

    public estadoSuscripcion: string;
    public estadoComentarios: string;
    public estadoLikes: string;
    public nombreRevista: string;
    public usuarioCreador: string;
    /**
     * Constructor que construye un InteraccionesRequest con la intencion de editar los estados de una revista
     * @param estadoSuscripcion 
     * @param estadoComentarios 
     * @param estadoLikes 
     */
    constructor(estadoSuscripcion: string, estadoComentarios: string, estadoLikes: string,
        nombreRevista: string, usuarioCreador: string) {
        this.estadoSuscripcion = estadoSuscripcion;
        this.estadoComentarios = estadoComentarios;
        this.estadoLikes = estadoLikes;
        this.nombreRevista = nombreRevista;
        this.usuarioCreador = usuarioCreador;
    }
}
