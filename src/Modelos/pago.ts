export class Pago {

    public fechaPago : string;
    public nombreUsuario: string;
    public nombreRevista: string;
    public usuarioCreador: string;

    constructor(fechaPago : string, nombreUsuario: string, nombreRevista: string, usuarioCreador: string){
        this.fechaPago = fechaPago;
        this.nombreUsuario = nombreUsuario;
        this.nombreRevista = nombreRevista;
        this.usuarioCreador = usuarioCreador;
    }
}
