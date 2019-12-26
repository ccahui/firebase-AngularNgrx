export enum TipoTransaccion {
    INGRESO = 'Ingreso', EGRESO = 'Egreso'
}

export class Transaccion {
    descripcion: string;
    monto: number;
    tipo: TipoTransaccion;

    constructor(data: { descripcion: string, monto: number, tipo: TipoTransaccion}) {
        this.descripcion = data && data.descripcion || null;
        this.monto = data && data.monto || null;
        this.tipo = data && data.tipo || null;
    }
}
