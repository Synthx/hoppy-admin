import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { routerNavigatedAction } from '@ngrx/router-store';
import { TranslateService } from '@ngx-translate/core';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { RouterSelector } from './router-selector.service';
import { RouterEffect } from './router.effect';

describe('router.effect', () => {
    let actions$: Observable<Actions>;
    let translateService: TranslateService;
    let titleService: Title;
    let routerSelector: RouterSelector;
    let effects: RouterEffect;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RouterEffect,
                provideMockActions(() => actions$),
                {
                    provide: Title,
                    useValue: {
                        setTitle: jest.fn(),
                    },
                },
                {
                    provide: RouterSelector,
                    useValue: {},
                },
                {
                    provide: TranslateService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        });

        translateService = TestBed.inject(TranslateService);
        titleService = TestBed.inject(Title);
        routerSelector = TestBed.inject(RouterSelector);
        effects = TestBed.inject(RouterEffect);
    });

    describe('routeChanged$', () => {
        it('should change page title when navigated', () => {
            // given
            actions$ = hot('-a', { a: routerNavigatedAction });

            // mock
            routerSelector.titleKey$ = hot('-k', { k: 'key' });
            jest.spyOn(translateService, 'get').mockReturnValue(cold('-(t|)', { t: 'test' }));
            jest.spyOn(titleService, 'setTitle').mockReturnValue();

            // expect
            expect(effects.routeChanged$).toSatisfyOnFlush(() => {
                expect(titleService.setTitle).toHaveBeenCalledTimes(1);
                expect(titleService.setTitle).toHaveBeenCalledWith('test');
            });
        });
    });
});
