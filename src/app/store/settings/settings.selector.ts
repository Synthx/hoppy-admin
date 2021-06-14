import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const getSettings = (state: AppState) => state.settings;

const language = createSelector(getSettings, state => state.language);
const deviceMode = createSelector(getSettings, state => state.deviceMode);
const navigationOpened = createSelector(getSettings, state => state.navigationOpened);
const fullscreenOpened = createSelector(getSettings, state => state.fullscreenOpened);
const loading = createSelector(getSettings, state => state.loading);

export const settingsSelector = {
    language,
    deviceMode,
    navigationOpened,
    fullscreenOpened,
    loading,
};
