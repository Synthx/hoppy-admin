import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { UserDispatcher } from '../../store/user/user-dispatcher.service';
import { UserSelector } from '../../store/user/user-selector.service';

@UntilDestroy()
@Component({
    selector: 'app-activate-user-dialog',
    templateUrl: './activate-user-dialog.component.html',
    styleUrls: ['./activate-user-dialog.component.scss'],
})
export class ActivateUserDialogComponent {
    static ID: string = 'activate-user-dialog';

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

    activate(): void {
        this.userDispatcher.activate(this.user);
    }
}
