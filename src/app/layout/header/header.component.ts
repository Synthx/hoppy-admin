import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../../models/user';
import { SettingsDispatcher } from '../../store/settings/settings-dispatcher.service';
import { SettingsSelector } from '../../store/settings/settings-selector.service';

@UntilDestroy()
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    user$: Observable<User>;

    constructor(
        private readonly settingsDispatcher: SettingsDispatcher,
        private readonly settingsSelector: SettingsSelector,
    ) {
        this.user$ = of({
            id: '1',
            email: 'taniel.remi@gmail.com',
            pseudo: 'Tanou',
        });
    }

    changeNavigationVisibility(): void {
        this.settingsSelector.navigationOpened$.pipe(first()).subscribe(opened => {
            if (opened) {
                this.settingsDispatcher.closeNavigation();
            } else {
                this.settingsDispatcher.openNavigation();
            }
        });
    }
}
