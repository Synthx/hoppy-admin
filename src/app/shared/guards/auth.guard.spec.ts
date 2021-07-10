import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { cold } from 'jest-marbles';
import { AuthSelector } from '../../store/auth/auth-selector.service';

import { AuthGuard } from './auth.guard';

describe('auth.guard', () => {
    let guard: AuthGuard;
    let authSelector: AuthSelector;
    let router: Router;

    const routeMock: any = { snapshot: {} };
    const routeStateMock: any = { snapshot: {}, url: '/dashboard' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                {
                    provide: Router,
                    useValue: {
                        createUrlTree: jest.fn(),
                    },
                },
                {
                    provide: AuthSelector,
                    useValue: {},
                },
            ],
        });

        guard = TestBed.inject(AuthGuard);
        authSelector = TestBed.inject(AuthSelector);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should return true when user is logged', () => {
        // mock
        authSelector.isLogged$ = cold('-(t|)', {
            t: true,
        });

        // call
        const result$ = guard.canActivate(routeMock, routeStateMock);

        // asserts
        expect(result$).toBeObservable(
            cold('-(t|)', {
                t: true,
            }),
        );
    });

    it('should redirect to /auth/login when user is not logged', () => {
        // mock
        authSelector.isLogged$ = cold('-(f|)', {
            f: false,
        });

        // call
        const result$ = guard.canActivate(routeMock, routeStateMock);

        // asserts
        expect(result$).toSatisfyOnFlush(() => {
            expect(router.createUrlTree).toHaveBeenCalledTimes(1);
            expect(router.createUrlTree).toHaveBeenCalledWith(['/auth/login']);
        });
    });
});
