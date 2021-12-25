export class Card {
    public nombreRevista: string;
    public descripcion: string;
    public categoria: string;
    public usuarioCreador: string;

    constructor(nombreRevista: string, descripcion: string, categoria: string, usuarioCreador: string){
        this.nombreRevista = nombreRevista;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.usuarioCreador = usuarioCreador
    }
}
