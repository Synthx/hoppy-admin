import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '../../models/user/user';
import { UserService } from './user.service';
import Auth = firebase.auth.Auth;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private readonly auth: AngularFireAuth, private readonly userService: UserService) {}

    current(): Observable<User | null> {
        return this.auth.user.pipe(
            first(),
            switchMap(user => {
                if (!user) return of(null);

                return this.userService.get(user.uid) as Observable<User>;
            }),
        );
    }

    token(): Observable<string | null> {
        return this.auth.idToken;
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
