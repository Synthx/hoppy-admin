import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TranslateService } from '@ngx-translate/core';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { UserService } from '../../shared/services/user.service';
import { userAction } from './user.action';
import { UserEffect } from './user.effect';

describe('user.effect', () => {
    let actions$: Observable<Actions>;
    let snackbar: MatSnackBar;
    let translateService: TranslateService;
    let userService: UserService;
    let effect: UserEffect;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserEffect,
                provideMockActions(() => actions$),
                {
                    provide: TranslateService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
                {
                    provide: MatSnackBar,
                    useValue: {
                        open: jest.fn(),
                    },
                },
                {
                    provide: UserService,
                    useValue: {
                        add: jest.fn(),
                    },
                },
            ],
        });

        translateService = TestBed.inject(TranslateService);
        snackbar = TestBed.inject(MatSnackBar);
        userService = TestBed.inject(UserService);
        effect = TestBed.inject(UserEffect);
    });

    describe('create$', () => {
        it('should dispatch create-success action', () => {
            // given
            const user = { email: 'test@hoppy.com' } as User;
            const action = userAction.create({ user });

            // mock
            jest.spyOn(userService, 'add').mockReturnValue(cold('-(u|)', { u: user }));

            // call
            actions$ = hot('-a', { a: action });

            // expect
            const completion = userAction.createSuccess({ user });
            const expected = cold('--c', { c: completion });

            expect(effect.create$).toBeObservable(expected);
        });

        it('should dispatch create-error action on error', () => {
            // given
            const user = { email: 'test@hoppy.com' } as User;
            const action = userAction.create({ user });

            // mock
            jest.spyOn(userService, 'add').mockReturnValue(cold('-#', undefined, 'oops'));

            // call
            actions$ = hot('-a', { a: action });

            // expect
            const completion = userAction.createError({ error: 'oops' });
            const expected = cold('--c', { c: completion });

            expect(effect.create$).toBeObservable(expected);
        });
    });

    describe('createSuccess$', () => {
        it('should open success snackbar', () => {
            // given
            const user = { email: 'test@hoppy.com' } as User;
            const action = userAction.createSuccess({ user });

            // mock
            jest.spyOn(translateService, 'get').mockReturnValue(cold('-(t|)', { t: 'message' }));
            jest.spyOn(snackbar, 'open').mockReturnValue({} as any);

            // call
            actions$ = hot('-a', { a: action });

            // expect
            expect(effect.createSuccess$).toSatisfyOnFlush(() => {
                expect(snackbar.open).toHaveBeenCalledTimes(1);
                expect(snackbar.open).toHaveBeenCalledWith('message');
            });
        });
    });
});
