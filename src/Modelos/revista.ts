export class Revista {

    //Los valores se trataran como stirng para poder adjuntarlos en el FormData de la reuqest al servidor
    public nombreRevista: string;
    public descripcion: string;
    public categoria: string;
    public contenido: File;
    public miniatura: File;
    public costoDeSuscripcion: string;
    public estadoSuscripcion: string;
    public estadoComentarios: string;
    public estadoLikes: string;
    public fechaDePublicacion: string;
    public usuarioCreador: string;

    /**
     * Constructor de la clase Revista que inicializa todos los atributos de la clase.
     * @param nombreRevista
     * @param categoria 
     * @param contenido 
     * @param costoDeSuscripcion 
     * @param estadoSuscripcion 
     * @param estadoComentarios 
     * @param estadoLikes 
     * @param fechaDePublicacion 
     */
    constructor(nombreRevista: string, categoria: string, contenido: File, costoDeSuscripcion: string,
    estadoSuscripcion: string, estadoComentarios: string, estadoLikes: string, fechaDePublicacion: string, usuarioCreador: string
    , descripcion: string, miniatura: File) {
        this.nombreRevista = nombreRevista;
        this.categoria = categoria;
        this.contenido = contenido;
        this.costoDeSuscripcion = costoDeSuscripcion;
        this.estadoSuscripcion = estadoSuscripcion;
        this.estadoComentarios = estadoComentarios;
        this.estadoLikes = estadoLikes;
        this.fechaDePublicacion = fechaDePublicacion;
        this.usuarioCreador = usuarioCreador;
        this.descripcion = descripcion;
        this.miniatura = miniatura;
    }
}
