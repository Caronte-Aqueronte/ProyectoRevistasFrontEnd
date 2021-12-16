export class Categoria {

    //atributos que componen la clase Categoria tanto en el frontend como en el backend
    public nombreCategoria: string;
    
    /**
     * Constructor de la clase Categoria que inicializa los atributos
     * @param nombreCategoria 
     */
    constructor(nombreCategoria: string){
        this.nombreCategoria = nombreCategoria;
    }
}
