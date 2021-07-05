import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const getAuth = (state: AppState) => state.auth;

const loading = createSelector(getAuth, auth => auth.loading);
const user = createSelector(getAuth, auth => auth.user);

const isLogged = createSelector(user, user => !!user);

export const authSelector = {
    loading,
    user,
    isLogged,
};
