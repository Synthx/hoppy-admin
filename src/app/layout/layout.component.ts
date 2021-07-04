import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { SettingsSelector } from '../store/settings/settings-selector.service';

@UntilDestroy()
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
    navigationOpened$: Observable<boolean>;

    constructor(private readonly settingsSelector: SettingsSelector) {
        this.navigationOpened$ = this.settingsSelector.navigationOpened$.pipe(untilDestroyed(this));
    }
}
