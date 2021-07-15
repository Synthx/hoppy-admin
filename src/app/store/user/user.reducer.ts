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
);
