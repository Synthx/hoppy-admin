import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

const login = createAction('auth/login', props<{ email: string; password: string }>());
const loginSuccess = createAction('auth/login-success', props<{ user: User }>());
const loginError = createAction('auth/login-error', props<{ error: any }>());

const logout = createAction('auth/logout');
const logoutSuccess = createAction('auth/logout-success');
const logoutError = createAction('auth/logout-error');

export const authAction = {
    login,
    loginSuccess,
    loginError,
    logout,
    logoutSuccess,
    logoutError,
};
