import { createReducer, on, select, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.actions';
import { AppState } from '../app.reducers';
import { Usuario } from '../../auth/user.modelo';


export interface StateAuth {
    usuario: Usuario;
}
const initialState: StateAuth = {
    usuario: null
};

const reducer = createReducer(initialState,
    on(fromAuth.loginSuccess, (state, { usuario }) => ({ ...state, usuario: { ...usuario } })),
    on(fromAuth.cerrarSesion, (state) => ({ ...state, usuario: null})),

);

export function AuthReducer(state: StateAuth, action): StateAuth {
    return reducer(state, action);
}


/*SELECT */
const fromAuthSelect = (state: AppState) => state.auth;
export const selectFromAuthUsuario = createSelector(
    fromAuthSelect,
    (state) => state.usuario);

export const AuthFeatureKey = 'auth';
