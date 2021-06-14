import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { authSelector } from './auth.selector';

@Injectable({
    providedIn: 'root',
})
export class AuthSelector {
    constructor(private readonly store: Store<AppState>) {}

    loading$ = this.store.select(authSelector.loading);
    user$ = this.store.select(authSelector.user);
}
