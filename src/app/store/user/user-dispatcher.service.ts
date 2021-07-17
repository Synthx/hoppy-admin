import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/user/user';
import { userAction } from './user.action';

@Injectable({
    providedIn: 'root',
})
export class UserDispatcher {
    constructor(private readonly store: Store) {}

    create(user: User): void {
        this.store.dispatch(userAction.create({ user }));
    }

    remove(user: User): void {
        this.store.dispatch(userAction.remove({ user }));
    }
}
