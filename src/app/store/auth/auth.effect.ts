import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { authAction } from './auth.action';

@Injectable()
export class AuthEffect {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly authService: AuthService,
    ) {}

    init$ = createEffect(() => this.actions$.pipe(ofType(ROOT_EFFECTS_INIT), mapTo(authAction.load())));

    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authAction.load),
            switchMap(() => {
                return this.authService.current().pipe(
                    map(user => authAction.loadSuccess({ user })),
                    catchError(error => of(authAction.loadError({ error }))),
                );
            }),
        ),
    );

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authAction.login),
            switchMap(({ email, password, rememberMe }) => {
                return this.authService.login(email, password, rememberMe).pipe(
                    map(user => authAction.loginSuccess({ user })),
                    catchError(error => of(authAction.loginError({ error: error.code }))),
                );
            }),
        ),
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authAction.loginSuccess),
                tap(() => {
                    this.router.navigate(['/dashboard']);
                }),
            ),
        { dispatch: false },
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authAction.logout),
            switchMap(() => {
                return this.authService.logout().pipe(
                    map(() => authAction.logoutSuccess()),
                    catchError(error => of(authAction.logoutError({ error }))),
                );
            }),
        ),
    );

    logoutSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authAction.logoutSuccess),
                delay(5000),
                tap(() => {
                    this.router.navigate(['/auth/login']);
                }),
            ),
        { dispatch: false },
    );

    forgotPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authAction.forgotPassword),
            switchMap(({ email }) => {
                return this.authService.forgotPassword(email).pipe(
                    map(() => authAction.forgotPasswordSuccess()),
                    catchError(error => of(authAction.forgotPasswordError({ error }))),
                );
            }),
        ),
    );

    forgotPasswordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authAction.forgotPasswordSuccess),
                delay(5000),
                tap(() => {
                    this.router.navigate(['/auth/login']);
                }),
            ),
        { dispatch: false },
    );
}
