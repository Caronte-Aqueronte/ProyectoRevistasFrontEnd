export class Suscripcion {

    private nombreUsuario: string;
    public nombreRevista: string;//variables que se enviaran
    public nombreUsuarioCreador: string;//
    public metodoPago: string;
    public fechaSuscripcion: string;

    constructor(nombreUsuario: string, nombreRevista: string, nombreUsuarioCreador: string, metodoPago: string, fechaSuscripcion: string) {
        this.nombreUsuario = nombreUsuario;
        this.nombreRevista = nombreRevista;
        this.nombreUsuarioCreador = nombreUsuarioCreador;
        this.metodoPago = metodoPago;
        this.fechaSuscripcion = fechaSuscripcion;
    }
}
