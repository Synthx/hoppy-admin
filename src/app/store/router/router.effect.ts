import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { RouterSelector } from './router-selector.service';

@Injectable()
export class RouterEffect {
    constructor(
        private readonly actions$: Actions,
        private readonly titleService: Title,
        private readonly routerSelector: RouterSelector,
        private readonly translateService: TranslateService,
    ) {}

    routeChanged$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(routerNavigatedAction),
                withLatestFrom(this.routerSelector.titleKey$),
                switchMap(([_, key]) => this.translateService.get(`router.${key}`)),
                tap(title => {
                    this.titleService.setTitle(title);
                }),
            ),
        { dispatch: false },
    );
}
