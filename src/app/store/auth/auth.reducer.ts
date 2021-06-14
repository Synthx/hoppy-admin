import { createReducer } from '@ngrx/store';
import { AuthState } from './auth.state';

const authInitialState: AuthState = {
    loading: false,
    user: null,
};

export const authReducer = createReducer(authInitialState);
