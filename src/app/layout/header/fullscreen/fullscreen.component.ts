import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { SettingsDispatcher } from '../../../store/settings/settings-dispatcher.service';
import { SettingsSelector } from '../../../store/settings/settings-selector.service';

@UntilDestroy()
@Component({
    selector: 'app-fullscreen',
    templateUrl: './fullscreen.component.html',
    styleUrls: ['./fullscreen.component.scss'],
})
export class FullscreenComponent {
    fullscreenOpened$: Observable<boolean>;

    constructor(
        private readonly settingsDispatcher: SettingsDispatcher,
        private readonly settingsSelector: SettingsSelector,
    ) {
        this.fullscreenOpened$ = this.settingsSelector.fullscreenOpened$.pipe(untilDestroyed(this));
    }

    openFullscreen(): void {
        this.settingsDispatcher.openFullscreen();
    }

    closeFullscreen(): void {
        this.settingsDispatcher.closeFullscreen();
    }
}
