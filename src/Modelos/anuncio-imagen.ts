export class AnuncioImagen {
    public nombreAnunciante: string;
    public nombreAnuncio: string;
    public textoAnuncio: string;
    public imagen: File | null;
    
    constructor(nombreAnunciante: string, nombreAnuncio: string, textoAnuncio: string, imagen:File | null) {
        this.nombreAnunciante = nombreAnunciante;
        this.nombreAnuncio = nombreAnuncio;
        this.textoAnuncio = textoAnuncio;
        this.imagen = imagen;
    }
}
