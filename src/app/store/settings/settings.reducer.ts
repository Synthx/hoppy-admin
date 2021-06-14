import { createReducer, on } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { settingsAction } from './settings.action';
import { SettingsState } from './settings.state';

export const settingsInitialState: SettingsState = {
    loading: false,
    navigationOpened: true,
    fullscreenOpened: false,
    language: environment.language.default,
    deviceMode: 'desktop',
};

export const settingsReducer = createReducer(
    settingsInitialState,
    // change-language
    on(settingsAction.changeLanguage, state => ({
        ...state,
        loading: true,
    })),
    on(settingsAction.changeLanguageSuccess, (state, { language }) => ({
        ...state,
        loading: false,
        language,
    })),
    on(settingsAction.changeLanguageError, state => ({
        ...state,
        loading: false,
    })),
    // fullscreen
    on(settingsAction.openFullscreen, state => ({
        ...state,
        fullscreenOpened: true,
    })),
    on(settingsAction.closeFullscreen, state => ({
        ...state,
        fullscreenOpened: false,
    })),
    // navigation
    on(settingsAction.openNavigation, state => ({
        ...state,
        navigationOpened: true,
    })),
    on(settingsAction.closeNavigation, state => ({
        ...state,
        navigationOpened: false,
    })),
);
