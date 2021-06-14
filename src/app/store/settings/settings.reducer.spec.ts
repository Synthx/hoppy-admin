import { settingsAction } from './settings.action';
import { settingsInitialState, settingsReducer } from './settings.reducer';

describe('settings.reducer', () => {
    it('should have an initial state', () => {
        const state = settingsReducer(settingsInitialState, { type: 'NOOP' });

        expect(state).toBeDefined();
    });

    describe('change-language action', () => {
        const action = settingsAction.changeLanguage({ language: 'en' });
        const state = settingsReducer(settingsInitialState, action);

        it('should start loading', () => {
            expect(state.loading).toBeTruthy();
        });

        it('should not update language', () => {
            expect(state.language).toBe('fr');
        });
    });

    describe('change-language-success action', () => {
        const action = settingsAction.changeLanguageSuccess({ language: 'en' });
        const state = settingsReducer(settingsInitialState, action);

        it('should stop loading', () => {
            expect(state.loading).toBeFalsy();
        });

        it('should update language', () => {
            expect(state.language).toBe('en');
        });
    });

    describe('change-language-error action', () => {
        const action = settingsAction.changeLanguageError();
        const state = settingsReducer(settingsInitialState, action);

        it('should stop loading', () => {
            expect(state.loading).toBeFalsy();
        });

        it('should not update language', () => {
            expect(state.language).toBe('fr');
        });
    });

    describe('open-fullscreen action', () => {
        const action = settingsAction.openFullscreen();
        const state = settingsReducer(settingsInitialState, action);

        it('should update fullscreen property', () => {
            expect(state.fullscreenOpened).toBeTruthy();
        });
    });

    describe('close-fullscreen action', () => {
        const action = settingsAction.closeFullscreen();
        const state = settingsReducer(settingsInitialState, action);

        it('should update fullscreen property', () => {
            expect(state.fullscreenOpened).toBeFalsy();
        });
    });

    describe('open-navigation action', () => {
        const action = settingsAction.openNavigation();
        const state = settingsReducer(settingsInitialState, action);

        it('should update navigation property', () => {
            expect(state.navigationOpened).toBeTruthy();
        });
    });

    describe('close-navigation action', () => {
        const action = settingsAction.closeNavigation();
        const state = settingsReducer(settingsInitialState, action);

        it('should update navigation property', () => {
            expect(state.navigationOpened).toBeFalsy();
        });
    });
});
