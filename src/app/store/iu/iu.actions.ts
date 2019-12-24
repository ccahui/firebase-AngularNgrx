import { createAction } from '@ngrx/store';

export const activarLoading = createAction(
    '[IU] Activar Loading',
);

export const desactivarLoading = createAction(
    '[IU] Desactivar Loading');
