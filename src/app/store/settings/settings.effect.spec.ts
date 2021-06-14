import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TranslateService } from '@ngx-translate/core';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { settingsAction } from './settings.action';
import { SettingsEffect } from './settings.effect';

describe('settings.effect', () => {
    let actions$: Observable<Actions>;
    let translateService: TranslateService;
    let effects: SettingsEffect;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SettingsEffect,
                provideMockActions(() => actions$),
                {
                    provide: TranslateService,
                    useValue: {
                        use: jest.fn(),
                    },
                },
            ],
        });

        translateService = TestBed.inject(TranslateService);
        effects = TestBed.inject(SettingsEffect);
    });

    describe('changeLanguage$', () => {
        const action = settingsAction.changeLanguage({ language: 'en' });

        it('should dispatch change-language-success action', () => {
            // given
            actions$ = hot('-a', { a: action });

            // mock
            jest.spyOn(translateService, 'use').mockReturnValue(cold('-(u|)', { u: undefined }));

            // expect
            const completion = settingsAction.changeLanguageSuccess({ language: 'en' });
            const expected = cold('--c', { c: completion });

            expect(effects.changeLanguage$).toBeObservable(expected);
        });

        it('should dispatch change-language-error action', () => {
            // given
            actions$ = hot('-a', { a: action });

            // mock
            jest.spyOn(translateService, 'use').mockReturnValue(cold('-#', undefined, 'error'));

            // expect
            const completion = settingsAction.changeLanguageError();
            const expected = cold('--c', { c: completion });

            expect(effects.changeLanguage$).toBeObservable(expected);
        });
    });
});
