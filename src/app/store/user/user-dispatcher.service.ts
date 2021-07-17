import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/user/user';
import { AppState } from '../app.state';
import { userAction } from './user.action';

@Injectable({
    providedIn: 'root',
})
export class UserDispatcher {
    constructor(private readonly store: Store<AppState>) {}

    create(user: User): void {
        this.store.dispatch(userAction.create({ user }));
    }

    remove(user: User): void {
        this.store.dispatch(userAction.remove({ user }));
    }

    disable(user: User): void {
        this.store.dispatch(userAction.disable({ user }));
    }
}
