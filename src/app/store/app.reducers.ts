import { StateIU } from './iu/iu.reducer';
import { StateAuth } from './auth/auth.reducer';

export interface AppState {
    iu: StateIU;
    auth: StateAuth;
}


