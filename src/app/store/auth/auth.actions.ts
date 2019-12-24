import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../auth/user.modelo';

export const loginSuccess = createAction(
    '[AUTH] Almacenar el usuario en el Storage',
    props<{ usuario: Usuario }>()
);

export const cerrarSesion = createAction(
    '[AUTH] Eliminar el usuari del Storage',
);



