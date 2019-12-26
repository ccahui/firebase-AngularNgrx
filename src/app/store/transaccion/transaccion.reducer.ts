import { createReducer, on, select, createSelector } from '@ngrx/store';
import * as fromTransaccion from './transaccion.actions';
import { AppState } from '../app.reducers';
import { Usuario } from '../../auth/user.modelo';
import { Transaccion, TipoTransaccion } from '../../tablero/transaccion.modelo';


export interface StateTransaccion {
    transacciones: Transaccion[];
}
const initialState: StateTransaccion = {
    transacciones: []
};

const reducer = createReducer(initialState,
    on(fromTransaccion.setTransacciones, (state, { transacciones }) => ({ ...state, transacciones: [...transacciones] })),
    on(fromTransaccion.unsetTransacciones, (state) => ({ ...state, transacciones: [] })),

);

export function TransaccionReducer(state: StateTransaccion, action): StateTransaccion {
    return reducer(state, action);
}


/*SELECT setTransacciones */
const transaccionesSelect = (state: AppState) => state.historial;
export const selectFromTransacciones = createSelector(
    transaccionesSelect,
    (state: StateTransaccion) => state.transacciones);

export const selectIngresosyEgresosObtenidos = createSelector(
    selectFromTransacciones,
    ((transacciones: Transaccion[]) => {
        let ingresos = 0;
        let egresos = 0;
        transacciones.forEach(transaccion => {

            switch (transaccion.tipo) {
                case TipoTransaccion.INGRESO:
                    ingresos += transaccion.monto;
                    break;
                case TipoTransaccion.EGRESO:
                    egresos += transaccion.monto;
                    break;
                default:
                    return;
            }
        });

        return { ingresos, egresos};
    })
);

export const TransaccionFeatureKey = 'historial';
