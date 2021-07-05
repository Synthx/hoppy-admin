import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private readonly auth: AngularFireAuth) {}

    current(): Observable<User | null> {
        return this.auth.user.pipe(
            first(),
            map(user => {
                if (!user) return null;

                return {
                    id: user.uid,
                    email: user.email!,
                    pseudo: user.displayName!,
                };
            }),
        );
    }

    login(email: string, password: string): Observable<User> {
        return fromPromise(this.auth.signInWithEmailAndPassword(email, password)).pipe(
            switchMap(() => this.current()),
            map(user => user as User),
        );
    }

    logout(): Observable<void> {
        return fromPromise(this.auth.signOut());
    }
}
