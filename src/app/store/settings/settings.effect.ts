import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { settingsAction } from './settings.action';

@Injectable()
export class SettingsEffect {
    constructor(
        private readonly actions$: Actions,
        private readonly breakpointObserver: BreakpointObserver,
        private readonly translateService: TranslateService,
    ) {}

    init$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ROOT_EFFECTS_INIT),
                tap(() => {
                    this.translateService.setDefaultLang(environment.language.default);
                    this.translateService.use(environment.language.default);
                }),
            ),
        { dispatch: false },
    );

    changeLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(settingsAction.changeLanguage),
            switchMap(({ language }) => {
                return this.translateService.use(language).pipe(
                    map(() => settingsAction.changeLanguageSuccess({ language })),
                    catchError(() => of(settingsAction.changeLanguageError())),
                );
            }),
        ),
    );

    openFullscreen$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(settingsAction.openFullscreen),
                tap(() => {
                    const element = document.documentElement as any;
                    const methods = [
                        'requestFullscreen',
                        'webkitRequestFullscreen',
                        'msRequestFullscreen',
                        'mozRequestFullScreen',
                    ];

                    const requestMethod = methods.find(method => !!element[method]);
                    if (!requestMethod) {
                        return;
                    }

                    const promise = element[requestMethod]();
                    if (!(promise instanceof Promise)) {
                        return;
                    }

                    promise.then(() => {});
                }),
            ),
        { dispatch: false },
    );

    closeFullscreen$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(settingsAction.closeFullscreen),
                tap(() => {
                    const element = document as any;
                    const methods = [
                        'exitFullscreen',
                        'webkitExitFullscreen',
                        'msExitFullscreen',
                        'mozCancelFullScreen',
                    ];

                    const requestMethod = methods.find(method => !!element[method]);
                    if (!requestMethod) {
                        return;
                    }

                    const promise = element[requestMethod]();
                    if (!(promise instanceof Promise)) {
                        return;
                    }

                    promise.then(() => {});
                }),
            ),
        { dispatch: false },
    );
}
