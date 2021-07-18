import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { UserDispatcher } from '../../store/user/user-dispatcher.service';
import { UserSelector } from '../../store/user/user-selector.service';

@UntilDestroy()
@Component({
    selector: 'app-disable-user-dialog',
    templateUrl: './disable-user-dialog.component.html',
    styleUrls: ['./disable-user-dialog.component.scss'],
})
export class DisableUserDialogComponent {
    static ID: string = 'disable-user-dialog';

    user: User;

    loading$: Observable<boolean>;

    constructor(
        @Inject(MAT_DIALOG_DATA) private readonly data: { user: User },
        private readonly userSelector: UserSelector,
        private readonly userDispatcher: UserDispatcher,
    ) {
        this.loading$ = this.userSelector.loading$.pipe(untilDestroyed(this));
        this.user = this.data.user;
    }

    disable(): void {
        this.userDispatcher.disable(this.user);
    }
}
