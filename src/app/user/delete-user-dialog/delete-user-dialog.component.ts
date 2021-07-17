import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { UserDispatcher } from '../../store/user/user-dispatcher.service';
import { UserSelector } from '../../store/user/user-selector.service';

@UntilDestroy()
@Component({
    selector: 'app-delete-user-dialog',
    templateUrl: './delete-user-dialog.component.html',
    styleUrls: ['./delete-user-dialog.component.scss'],
})
export class DeleteUserDialogComponent {
    static ID: string = 'delete-user-dialog';

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

    remove(): void {
        this.userDispatcher.remove(this.user);
    }
}
