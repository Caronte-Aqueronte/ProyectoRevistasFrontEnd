export class ConsultaSuscripcion {

    public nombreUsuario: string;
    public nombreRevista: string;
    public nombreUsuarioCreador: string;

    constructor(nombreUsuario: string, nombreRevista: string, nombreUsuarioCreador: string){
        this.nombreRevista = nombreRevista;
        this.nombreUsuario = nombreUsuario;
        this.nombreUsuarioCreador = nombreUsuarioCreador;
    }
}
