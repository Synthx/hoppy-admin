import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { routerSelector } from './router.selector';

@Injectable({
    providedIn: 'root',
})
export class RouterSelector {
    constructor(private readonly store: Store) {}

    data$ = this.store.select(routerSelector.data);
    url$ = this.store.select(routerSelector.url);
    titleKey$ = this.store.select(routerSelector.titleKey);
}
