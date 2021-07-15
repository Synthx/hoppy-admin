import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { routerSelector } from './router.selector';

@Injectable({
    providedIn: 'root',
})
export class RouterSelector {
    constructor(private readonly store: Store<AppState>) {}

    data$ = this.store.select(routerSelector.data);
    url$ = this.store.select(routerSelector.url);
    titleKey$ = this.store.select(routerSelector.titleKey);
}
