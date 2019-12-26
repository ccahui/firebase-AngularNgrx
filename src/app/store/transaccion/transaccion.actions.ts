import { createAction, props } from '@ngrx/store';
import { Transaccion } from '../../tablero/transaccion.modelo';

export const setTransacciones = createAction(
    '[TRANSACCION] Actualizando en el store transacciones',
    props<{ transacciones: Transaccion[] }>()
);

export const unsetTransacciones = createAction(
    '[TRANSACCION] Vacia del store las transacciones',
);



