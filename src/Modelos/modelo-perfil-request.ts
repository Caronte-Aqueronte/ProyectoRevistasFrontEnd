import { ModeloPerfil } from "./modelo-perfil";

export class ModeloPerfilRequest {

    //Atributos de la clase
    public perfil: ModeloPerfil;
    public usuario: string;
    /**
     * Constructor de la clase ModeloPerfilRequest que inicializa todos los atibutos
     * @param perfil 
     * @param nombreUsuario 
     */
    constructor(perfil: ModeloPerfil, nombreUsuario: string) {
        this.perfil = perfil;
        this.usuario = nombreUsuario;
    }
}
