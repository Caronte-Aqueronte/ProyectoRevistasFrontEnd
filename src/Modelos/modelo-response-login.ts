import { Usuario } from "./usuario";

export class ModeloResponseLogin {
    
    public usuario: Usuario;
    public banderaExisteUsuario: boolean;
    
    /**
     * Contructor de la ModeloResponseLogin case que inicializa los atributos:
     * @param usuario 
     * @param banderaExisteUsuario 
     */
    constructor(usuario: Usuario, banderaExisteUsuario: boolean){
        this.usuario = usuario;
        this.banderaExisteUsuario = banderaExisteUsuario;
    }
}
