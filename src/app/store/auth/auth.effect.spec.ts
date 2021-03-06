import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { createAction } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { AuthService } from '../../shared/services/auth.service';
import { authAction } from './auth.action';
import { AuthEffect } from './auth.effect';

describe('auth.effect', () => {
    let actions$: Observable<Actions>;
    let translateService: TranslateService;
    let router: Router;
    let authService: AuthService;
    let effect: AuthEffect;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthEffect,
                provideMockActions(() => actions$),
                {
                    provide: TranslateService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
                {
                    provide: Router,
                    useValue: {
                        navigate: jest.fn(),
                    },
                },
                {
                    provide: AuthService,
                    useValue: {
                        current: jest.fn(),
                        login: jest.fn(),
                        logout: jest.fn(),
                    },
                },
            ],
        });

        translateService = TestBed.inject(TranslateService);
        router = TestBed.inject(Router);
        authService = TestBed.inject(AuthService);
        effect = TestBed.inject(AuthEffect);
    });

    describe('init$', () => {
        it('should dispatch load action', () => {
            // given
            const action = createAction(ROOT_EFFECTS_INIT);

            // call
            actions$ = hot('-a', { a: action });

            // expect
            const completion = authAction.load();
            const expected = cold('-c', { c: completion });

            expect(effect.init$).toBeObservable(expected);
        });
    });

    describe('load$', () => {
        it('should dispatch load-success action', () => {
            // given
            const action = authAction.load();

            // mock
            jest.spyOn(authService, 'current').mockReturnValue(cold('-(u|)', { u: null }));

            // call
            actions$ = hot('-a', { a: action });

            // expect
            const completion = authAction.loadSuccess({ user: null });
            const expected = cold('--c', { c: completion });

            expect(effect.load$).toBeObservable(expected);
        });

        it('should dispatch load-error action on error', () => {
            // given
            const action = authAction.load();

            // mock
            jest.spyOn(authService, 'current').mockReturnValue(cold('-#', undefined, 'oops'));

            // call
            actions$ = hot('-a', { a: action });

            // expect
            const completion = authAction.loadError({ error: 'oops' });
            const expected = cold('--c', { c: completion });

            expect(effect.load$).toBeObservable(expected);
        });
    });

    describe('login$', () => {
        it('should dispatch login-success action', () => {
            // given
            const action = authAction.login({ email: 'test@test.com', password: 'test', rememberMe: true });
            const user = { id: '1' } as User;

            // mock
            jest.spyOn(authService, 'login').mockReturnValue(cold('-(u|)', { u: user }));

            // call
            actions$ = hot('-a', { a: action });

            // expect
            const completion = authAction.loginSuccess({ user });
            const expected = cold('--c', { c: completion });

            expect(effect.login$).toBeObservable(expected);
        });

        it('should dispatch login-error action on error', () => {
            // given
            const action = authAction.login({ email: 'test@test.com', password: 'test', rememberMe: true });
            const error = { code: 'oops-code' };

            // mock
            jest.spyOn(authService, 'login').mockReturnValue(cold('-#', undefined, error));
            jest.spyOn(translateService, 'get').mockReturnValue(cold('-t', { t: 'oops' }));

            // call
            actions$ = hot('-a', { a: action });

            // expect
            const completion = authAction.loginError({ error: 'oops' });
            const expected = cold('---c', { c: completion });

            expect(effect.login$).toBeObservable(expected);
        });
    });

    describe('loginSuccess$', () => {
        it('should redirect to /dashboard page', () => {
            // given
            const user = { id: '1' } as User;
            const action = authAction.loginSuccess({ user });

            // mock
            jest.spyOn(router, 'navigate').mockResolvedValue(true);

            // call
            actions$ = hot('-a', { a: action });

            // expect
            expect(effect.loginSuccess$).toSatisfyOnFlush(() => {
                expect(router.navigate).toHaveBeenCalledTimes(1);
                expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
            });
        });
    });

    describe('logout$', () => {
        it('should dispatch logout-success action', () => {
            // given
            const action = authAction.logout();

            // mock
            jest.spyOn(authService, 'logout').mockReturnValue(cold('-(u|)', { u: undefined }));

            // call
            actions$ = hot('-a', { a: action });

            // expect
            const completion = authAction.logoutSuccess();
            const expected = cold('--c', { c: completion });

            expect(effect.logout$).toBeObservable(expected);
        });

        it('should dispatch logout-error action on error', () => {
            // given
            const action = authAction.logout();
            const error = { code: 'oops' };

            // mock
            jest.spyOn(authService, 'logout').mockReturnValue(cold('-#', undefined, error));

            // call
            actions$ = hot('-a', { a: action });

            // expect
            const completion = authAction.logoutError({ error });
            const expected = cold('--c', { c: completion });

            expect(effect.logout$).toBeObservable(expected);
        });
    });

    describe('logoutSuccess$', () => {
        it('should redirect to /auth/login page', fakeAsync(() => {
            // given
            const action = authAction.logoutSuccess();

            // mock
            jest.spyOn(router, 'navigate').mockResolvedValue(true);

            // call
            actions$ = hot('-a', { a: action });

            // expect
            effect.logoutSuccess$.subscribe(() => {});

            tick(5000);

            expect(router.navigate).toHaveBeenCalledTimes(1);
            expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
        }));
    });

    describe('forgotPasswordSuccess$', () => {
        it('should redirect to /auth/login page', fakeAsync(() => {
            // given
            const action = authAction.forgotPasswordSuccess();

            // mock
            jest.spyOn(router, 'navigate').mockResolvedValue(true);

            // call
            actions$ = hot('-a', { a: action });

            // expect
            effect.forgotPasswordSuccess$.subscribe(() => {});

            tick(5000);

            expect(router.navigate).toHaveBeenCalledTimes(1);
            expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
        }));
    });
});
