export class TagRevista {

    //atributos de la clase TagRevista
    public nombreRevista: string;
    public usuarioCreador: string;
    public nombreTag: string;

    /**
     * Constructor de la clase TagRevista que inizializa los atributos de la clase
     * @param nombreRevista 
     * @param usuarioCreador 
     * @param nombreTag 
     */
    constructor(nombreRevista: string, usuarioCreador: string, nombreTag: string){
        this.nombreRevista = nombreRevista;
        this.usuarioCreador = usuarioCreador;
        this.nombreTag = nombreTag;
    }
}
