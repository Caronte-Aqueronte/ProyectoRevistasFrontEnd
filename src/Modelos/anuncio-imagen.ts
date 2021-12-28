export class AnuncioImagen {
    public nombreAnunciante: string;
    public nombreAnuncio: string;
    public textoAnuncio: string;
    public imagen: File;
    
    constructor(nombreAnunciante: string, nombreAnuncio: string, textoAnuncio: string, imagen:File) {
        this.nombreAnunciante = nombreAnunciante;
        this.nombreAnuncio = nombreAnuncio;
        this.textoAnuncio = textoAnuncio;
        this.imagen = imagen;
    }
}
