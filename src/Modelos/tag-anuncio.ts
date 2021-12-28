export class TagAnuncio {
    //atributos de la clase TagAuncio
    public nombreAnuncio: string;
    public nombreAunciante: string;
    public nombreTag: string;

    constructor(nombreAnuncio: string, nombreAunciante: string, nombreTag: string) {
        this.nombreAnuncio = nombreAnuncio;
        this.nombreAunciante = nombreAunciante;
        this.nombreTag = nombreTag;
    }
}
