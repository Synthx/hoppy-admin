import { createReducer, on } from '@ngrx/store';
import { authAction } from './auth.action';
import { AuthState } from './auth.state';

export const authInitialState: AuthState = {
    loading: false,
    user: null,
};

export const authReducer = createReducer(
    authInitialState,
    // load
    on(authAction.load, state => ({
        ...state,
        loading: true,
        user: null,
    })),
    on(authAction.loadSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        user,
    })),
    on(authAction.loadError, state => ({
        ...state,
        loading: false,
    })),
    // login
    on(authAction.login, state => ({
        ...state,
        loading: true,
    })),
    on(authAction.loginSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        user,
    })),
    on(authAction.loginError, state => ({
        ...state,
        loading: false,
    })),
    // logout
    on(authAction.logout, state => ({
        ...state,
        loading: true,
    })),
    on(authAction.logoutSuccess, state => ({
        ...state,
        loading: false,
        user: null,
    })),
    on(authAction.logoutError, state => ({
        ...state,
        loading: false,
    })),
);
