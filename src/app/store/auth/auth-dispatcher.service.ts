import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { authAction } from './auth.action';

@Injectable({
    providedIn: 'root',
})
export class AuthDispatcher {
    constructor(private readonly store: Store<AppState>) {}

    login(email: string, password: string, rememberMe: boolean): void {
        this.store.dispatch(authAction.login({ email, password, rememberMe }));
    }

    logout(): void {
        this.store.dispatch(authAction.logout());
    }

    forgotPassword(email: string): void {
        this.store.dispatch(authAction.forgotPassword({ email }));
    }
}
