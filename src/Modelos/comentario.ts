export class Comentario {

    public contenidoComentario: string;
    public nombreRevista: string;
    public usuarioCreador: string;

    constructor(contenidoComentario: string, nombreRevista: string, usuarioCreador: string) {
        this.contenidoComentario = contenidoComentario;
        this.nombreRevista = nombreRevista;
        this.usuarioCreador = usuarioCreador;
    }
}
