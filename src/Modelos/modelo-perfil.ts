export class ModeloPerfil {

    //atributos
    public descripcion: string;
    public hobbies: string;

    /**
     * Constructor de la clase ModeloPerfil que inicializa los atrubutos de la clase
     * @param descripcion 
     * @param hobbies 
     */
    constructor(descripcion: string, hobbies: string) {
        this.descripcion = descripcion;
        this.hobbies = hobbies;
    }
}
