import { createReducer, on } from '@ngrx/store';
import { userAction } from './user.action';
import { UserState } from './user.state';

export const userInitialState: UserState = {
    loading: false,
};

export const userReducer = createReducer(
    userInitialState,
    // create
    on(userAction.create, state => ({
        ...state,
        loading: true,
    })),
    on(userAction.createSuccess, state => ({
        ...state,
        loading: false,
    })),
    on(userAction.createError, state => ({
        ...state,
        loading: false,
    })),
    // remove
    on(userAction.remove, state => ({
        ...state,
        loading: true,
    })),
    on(userAction.removeSuccess, state => ({
        ...state,
        loading: false,
    })),
    on(userAction.removeError, state => ({
        ...state,
        loading: false,
    })),
    // disable
    on(userAction.disable, state => ({
        ...state,
        loading: true,
    })),
    on(userAction.disableSuccess, state => ({
        ...state,
        loading: false,
    })),
    on(userAction.disableError, state => ({
        ...state,
        loading: false,
    })),
    // activate
    on(userAction.activate, state => ({
        ...state,
        loading: true,
    })),
    on(userAction.activateSuccess, state => ({
        ...state,
        loading: false,
    })),
    on(userAction.activateError, state => ({
        ...state,
        loading: false,
    })),
);
