import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

const load = createAction('auth/load');
const loadSuccess = createAction('auth/load-success', props<{ user: User | null }>());
const loadError = createAction('auth/load-error', props<{ error: any }>());

const login = createAction('auth/login', props<{ email: string; password: string }>());
const loginSuccess = createAction('auth/login-success', props<{ user: User }>());
const loginError = createAction('auth/login-error', props<{ error: any }>());

const logout = createAction('auth/logout');
const logoutSuccess = createAction('auth/logout-success');
const logoutError = createAction('auth/logout-error', props<{ error: any }>());

export const authAction = {
    load,
    loadSuccess,
    loadError,
    login,
    loginSuccess,
    loginError,
    logout,
    logoutSuccess,
    logoutError,
};
