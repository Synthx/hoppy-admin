import { AppState } from '../app.state';
import { settingsSelector } from './settings.selector';

describe('settings.selector', () => {
    const appState = {
        settings: {
            loading: false,
            language: 'fr',
            deviceMode: 'mobile',
            fullscreenOpened: false,
            navigationOpened: true,
        },
    } as AppState;

    describe('language', () => {
        it('should select current language', () => {
            const result = settingsSelector.language(appState);
            expect(result).toBe('fr');
        });
    });

    describe('deviceMode', () => {
        it('should select current device mode', () => {
            const result = settingsSelector.deviceMode(appState);
            expect(result).toBe('mobile');
        });
    });

    describe('navigationOpened', () => {
        it('should select if navigation is opened', () => {
            const result = settingsSelector.navigationOpened(appState);
            expect(result).toBeTruthy();
        });
    });

    describe('fullscreenOpened', () => {
        it('should select if fullscreen is opened', () => {
            const result = settingsSelector.fullscreenOpened(appState);
            expect(result).toBeFalsy();
        });
    });
});
