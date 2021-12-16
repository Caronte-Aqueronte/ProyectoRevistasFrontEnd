export class InteraccionConRevista {

    public estadoLikes: boolean;
    public estadoComentarios: boolean;
    public estadoSuscripciones: boolean;

    constructor(estadoLikes: boolean, estadoComentarios: boolean, estadoSuscripciones: boolean){
        this.estadoComentarios =estadoComentarios;
        this.estadoLikes = estadoLikes;
        this.estadoSuscripciones = estadoSuscripciones;
    }
}
