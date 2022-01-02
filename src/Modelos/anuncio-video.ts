import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class AnuncioVideo {
    public nombreAnunciante: string;
    public nombreAnuncio: string;
    public textoAnuncio: string;
    public link: string;
    
    constructor(nombreAnunciante: string, nombreAnuncio: string, textoAnuncio: string, link: string) {
        this.nombreAnunciante = nombreAnunciante;
        this.nombreAnuncio = nombreAnuncio;
        this.textoAnuncio = textoAnuncio;
        this.link = link;
    }
}
