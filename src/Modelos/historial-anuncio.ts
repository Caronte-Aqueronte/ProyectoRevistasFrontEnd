export class HistorialAnuncio {
    public nombreAnuncio: string;
    public nombreAnunciante: string;
    public url: string;

    constructor(nombreAnuncio: string, nombreAnunciante: string, url: string) {
        this.nombreAnunciante = nombreAnunciante;
        this.nombreAnuncio = nombreAnuncio;
        this.url = url;
    }

}
