export class Suscripcion {

    private nombreUsuario: string;
    public nombreRevista: string;//variables que se enviaran
    public usuarioCreador: string;//
    public metodoPago: string;
    public fechaSuscripcion: string;

    constructor(nombreUsuario: string, nombreRevista: string, usuarioCreador: string, metodoPago: string, fechaSuscripcion: string) {
        this.nombreUsuario = nombreUsuario;
        this.nombreRevista = nombreRevista;
        this.usuarioCreador = usuarioCreador;
        this.metodoPago = metodoPago;
        this.fechaSuscripcion = fechaSuscripcion;
    }
}
