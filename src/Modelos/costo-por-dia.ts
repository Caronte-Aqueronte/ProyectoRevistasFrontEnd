export class CostoPorDia {
    public nombreRevista: string;
    public usuarioCreador: string;
    public costoPorDia: number;
    public fechaDeValidez: string;
    constructor(nombreRevista: string, usuarioCreador: string, costoPorDia: number, fechaDeValidez: string) {
        this.nombreRevista = nombreRevista;
        this.usuarioCreador = usuarioCreador;
        this.costoPorDia = costoPorDia;
        this.fechaDeValidez = fechaDeValidez;
    }
}
