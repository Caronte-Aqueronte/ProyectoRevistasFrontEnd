export class TagUsuario {

    public nombreTag: string;//nombre del tag en cuestion
    public nombreDeUsuario: string;// nombre del usuario en custion

    /**
     * Constructor de la clase que inicializa los atributos:
     * @param nombreDeUsuario 
     */
    constructor(nombreTag: string, nombreDeUsuario: string){
        this.nombreTag = nombreTag;
        this.nombreDeUsuario = nombreDeUsuario;
    }
}
