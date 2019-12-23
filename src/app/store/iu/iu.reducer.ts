import { createReducer, on, select, createSelector } from '@ngrx/store';
import * as fromIU from './iu.actions';
import { AppState } from '../app.reducers';


export interface StateIU {
    isLoading: boolean;
}
const initialState: StateIU = {
    isLoading: false,
};

const reducer = createReducer(initialState,
    on(fromIU.activarLoading, state => ({ ...state, isLoading: true })),
    on(fromIU.desactivarLoading, state => ({ ...state, isLoading: false })),
);

export function IUReducer(state: StateIU, action): StateIU {
    return reducer(state, action);
}


/*SELECT */
const fromIUSelect = (state: AppState) => state.iu;
export const selectFromIULoading = createSelector(
    fromIUSelect,
    (state) => state.isLoading);

export const IUFeatureKey = 'iu';
