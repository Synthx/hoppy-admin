import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { settingsSelector } from './settings.selector';

@Injectable({
    providedIn: 'root',
})
export class SettingsSelector {
    constructor(private readonly store: Store<AppState>) {}

    language$ = this.store.select(settingsSelector.language);
    deviceMode$ = this.store.select(settingsSelector.deviceMode);
    navigationOpened$ = this.store.select(settingsSelector.navigationOpened);
    fullscreenOpened$ = this.store.select(settingsSelector.fullscreenOpened);
}
