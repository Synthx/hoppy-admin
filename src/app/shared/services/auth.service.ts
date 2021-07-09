import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '../../models/user';
import Auth = firebase.auth.Auth;

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

    login(email: string, password: string, rememberMe: boolean): Observable<User> {
        const persistenceType = rememberMe ? Auth.Persistence.LOCAL : Auth.Persistence.SESSION;
        return fromPromise(this.auth.setPersistence(persistenceType)).pipe(
            switchMap(() => fromPromise(this.auth.signInWithEmailAndPassword(email, password))),
            switchMap(() => this.current()),
            map(user => user as User),
        );
    }

    logout(): Observable<void> {
        return fromPromise(this.auth.signOut());
    }

    forgotPassword(email: string): Observable<void> {
        return fromPromise(this.auth.sendPasswordResetEmail(email));
    }
}
