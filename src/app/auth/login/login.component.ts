import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { AuthDispatcher } from '../../store/auth/auth-dispatcher.service';
import { AuthSelector } from '../../store/auth/auth-selector.service';
import { authAction } from '../../store/auth/auth.action';

@UntilDestroy()
@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error?: string;

    loading$: Observable<boolean>;

    constructor(
        private readonly actions$: Actions,
        private readonly formBuilder: FormBuilder,
        private readonly authSelector: AuthSelector,
        private readonly authDispatcher: AuthDispatcher,
    ) {
        this.loading$ = this.authSelector.loading$.pipe(untilDestroyed(this));
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            rememberMe: false,
        });
    }

    ngOnInit(): void {
        this.actions$.pipe(ofType(authAction.loginError), untilDestroyed(this)).subscribe(({ error }) => {
            this.error = error;
        });
    }

    login(): void {
        if (this.loginForm.invalid) return;

        const { email, password, rememberMe } = this.loginForm.value;
        this.authDispatcher.login(email, password, rememberMe);
    }
}
