export class AnuncioTexto {
    
    public nombreAnunciante: string;
    public nombreAnuncio: string;
    public textoAnuncio: string;

    constructor(nombreAnunciante: string, nombreAnuncio: string, textoAnuncio: string) {
        this.nombreAnunciante = nombreAnunciante;
        this.nombreAnuncio = nombreAnuncio;
        this.textoAnuncio = textoAnuncio;
    }
}
