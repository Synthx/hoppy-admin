import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const getUser = (state: AppState) => state.user;

const loading = createSelector(getUser, user => user.loading);

export const userSelector = {
    loading,
};
