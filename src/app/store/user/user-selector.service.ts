import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { userSelector } from './user.selector';

@Injectable({
    providedIn: 'root',
})
export class UserSelector {
    constructor(private readonly store: Store<AppState>) {}

    loading$ = this.store.select(userSelector.loading);
}
