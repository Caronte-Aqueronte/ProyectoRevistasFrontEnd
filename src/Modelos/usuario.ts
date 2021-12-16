export class Usuario {

  public usuario: string;
  public password: string;
  public rol: string;

  /**
   * Constructor de la clase Usuario que inicializa los atributos:
   * @param usuario
   * @param password 
   * @param rol 
   */
  constructor(usuario: string, password: string, rol: string) {
    this.usuario = usuario;
    this.password = password;
    this.rol = rol;
  }
}
