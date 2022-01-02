export class Anuncio {
    public nombreAnunciante: string;
    public nombreAnuncio: string;
    public tipoAnuncio: string;
    public pago: number;
    public estado: string;

    constructor(nombreAnunciante: string, nombreAnuncio: string, tipoAnuncio: string, pago: number, estado: string) {
        this.nombreAnunciante = nombreAnunciante;
        this.nombreAnuncio = nombreAnuncio;
        this.tipoAnuncio = tipoAnuncio;
        this.pago = pago;
        this.estado = estado;
    }
}
