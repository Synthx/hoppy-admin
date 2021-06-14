import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { settingsAction } from './settings.action';

@Injectable({
    providedIn: 'root',
})
export class SettingsDispatcher {
    constructor(private readonly store: Store<AppState>) {}

    changeLanguage(language: string): void {
        this.store.dispatch(settingsAction.changeLanguage({ language }));
    }

    openNavigation(): void {
        this.store.dispatch(settingsAction.openNavigation());
    }

    closeNavigation(): void {
        this.store.dispatch(settingsAction.closeNavigation());
    }

    openFullscreen(): void {
        this.store.dispatch(settingsAction.openFullscreen());
    }

    closeFullscreen(): void {
        this.store.dispatch(settingsAction.closeFullscreen());
    }
}
