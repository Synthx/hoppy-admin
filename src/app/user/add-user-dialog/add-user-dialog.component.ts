import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { UserRole } from '../../models/user/user-role';
import { UserDispatcher } from '../../store/user/user-dispatcher.service';
import { UserSelector } from '../../store/user/user-selector.service';

@UntilDestroy()
@Component({
    selector: 'app-add-user-dialog',
    templateUrl: './add-user-dialog.component.html',
    styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent {
    static ID: string = 'add-user-dialog';

    addUserForm: FormGroup;

    loading$: Observable<boolean>;

    userRoles = Object.values(UserRole);

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly userSelector: UserSelector,
        private readonly userDispatcher: UserDispatcher,
    ) {
        this.loading$ = this.userSelector.loading$.pipe(untilDestroyed(this));
        this.addUserForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
            pseudo: ['', [Validators.required]],
            role: [UserRole.USER, [Validators.required]],
            avatar: null,
            emailVerified: true,
        });
    }

    addUser(): void {
        if (this.addUserForm.invalid) return;

        const user = this.addUserForm.value;
        this.userDispatcher.create(user);
    }
}
