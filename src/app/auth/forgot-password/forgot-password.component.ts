import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { AuthDispatcher } from '../../store/auth/auth-dispatcher.service';
import { AuthSelector } from '../../store/auth/auth-selector.service';

@UntilDestroy()
@Component({
    selector: 'app-auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup;
    email?: string;

    loading$: Observable<boolean>;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly authSelector: AuthSelector,
        private readonly authDispatcher: AuthDispatcher,
    ) {
        this.loading$ = this.authSelector.loading$.pipe(untilDestroyed(this));
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    sendEmail(): void {
        if (this.forgotPasswordForm.invalid) return;

        const { email } = this.forgotPasswordForm.value;
        this.email = email;
        this.authDispatcher.forgotPassword(email);
    }
}
