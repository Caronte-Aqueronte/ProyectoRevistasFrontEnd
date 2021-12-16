export class ResumenDeRevista {

    public nombreRevista: string;
    public descripcion: string;
    public categoria: string;
    public usuarioCreador: string; 
    public numeroDeLikes: number;

    constructor(nombreRevista: string, descripcion: string, categoria: string, usuarioCreador: string, numeroDeLikes: number){
        this.nombreRevista = nombreRevista;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.usuarioCreador = usuarioCreador;
        this.numeroDeLikes = numeroDeLikes;
    }
}
