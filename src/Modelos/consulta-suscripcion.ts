export class ConsultaSuscripcion {

    public nombreUsuario: string;
    public nombreRevista: string;
    public usuarioCreador: string;

    constructor(nombreUsuario: string, nombreRevista: string, usuarioCreador: string){
        this.nombreRevista = nombreRevista;
        this.nombreUsuario = nombreUsuario;
        this.usuarioCreador = usuarioCreador;
    }
}
