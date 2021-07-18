import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../../models/user/user';
import { AuthSelector } from '../../store/auth/auth-selector.service';
import { SettingsDispatcher } from '../../store/settings/settings-dispatcher.service';
import { SettingsSelector } from '../../store/settings/settings-selector.service';

@UntilDestroy()
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    user$: Observable<User | null>;

    constructor(
        private readonly settingsDispatcher: SettingsDispatcher,
        private readonly settingsSelector: SettingsSelector,
        private readonly authSelector: AuthSelector,
    ) {
        this.user$ = this.authSelector.user$.pipe(untilDestroyed(this));
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
