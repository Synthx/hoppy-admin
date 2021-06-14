import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SettingsDispatcher } from '../../../store/settings/settings-dispatcher.service';
import { SettingsSelector } from '../../../store/settings/settings-selector.service';

@UntilDestroy()
@Component({
    selector: 'app-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
    language$: Observable<string>;
    languages: string[];

    constructor(
        private readonly settingsSelector: SettingsSelector,
        private readonly settingsDispatcher: SettingsDispatcher,
    ) {
        this.language$ = this.settingsSelector.language$.pipe(untilDestroyed(this));
        this.languages = environment.language.available;
    }

    ngOnInit(): void {}

    changeLanguage(language: string): void {
        this.settingsDispatcher.changeLanguage(language);
    }
}
