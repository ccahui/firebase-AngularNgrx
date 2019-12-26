import { StateIU } from './iu/iu.reducer';
import { StateAuth } from './auth/auth.reducer';
import { StateTransaccion } from './transaccion/transaccion.reducer';

export interface AppState {
    iu: StateIU;
    auth: StateAuth;
    historial: StateTransaccion;
}


