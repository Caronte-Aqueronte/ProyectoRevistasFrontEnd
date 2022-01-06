export class Comentario {

    public contenidoComentario: string;
    public nombreRevista: string;
    public usuarioCreador: string;
    public nombreUsuarioComentador:string;
    
    constructor(contenidoComentario: string, nombreRevista: string, usuarioCreador: string, nombreUsuarioComentador:string) {
        this.contenidoComentario = contenidoComentario;
        this.nombreRevista = nombreRevista;
        this.usuarioCreador = usuarioCreador;
        this.nombreUsuarioComentador = nombreUsuarioComentador;
    }
}
