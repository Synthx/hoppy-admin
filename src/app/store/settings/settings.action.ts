import { createAction, props } from '@ngrx/store';

const openNavigation = createAction('settings/open-navigation');
const closeNavigation = createAction('settings/close-navigation');

const openFullscreen = createAction('settings/open-fullscreen');
const closeFullscreen = createAction('settings/close-fullscreen');

const changeLanguage = createAction('settings/change-language', props<{ language: string }>());
const changeLanguageSuccess = createAction('settings/change-language-success', props<{ language: string }>());
const changeLanguageError = createAction('settings/change-language-error');

export const settingsAction = {
    openNavigation,
    closeNavigation,
    openFullscreen,
    closeFullscreen,
    changeLanguage,
    changeLanguageSuccess,
    changeLanguageError,
};
