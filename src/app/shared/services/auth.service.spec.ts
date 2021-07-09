import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { cold } from 'jest-marbles';
import { User } from '../../models/user';

import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let auth: AngularFireAuth;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                {
                    provide: AngularFireAuth,
                    useValue: {
                        setPersistence: jest.fn(),
                        signInWithEmailAndPassword: jest.fn(),
                        signOut: jest.fn(),
                        sendPasswordResetEmail: jest.fn(),
                    },
                },
            ],
        });

        service = TestBed.inject(AuthService);
        auth = TestBed.inject(AngularFireAuth);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('current', () => {
        it('should return null when no current user', () => {
            // mock
            Object.defineProperty(auth, 'user', { get: () => cold('-(u|)', { u: null }) });

            // call
            const result$ = service.current();

            // expect
            const expected = cold('-(u|)', { u: null });
            expect(result$).toBeObservable(expected);
        });

        it('should return current user if logged', () => {
            // given
            const user = { uid: '1', email: 'test@test.com', displayName: 'test' } as any;

            // mock
            Object.defineProperty(auth, 'user', { get: () => cold('-(u|)', { u: user }) });

            // call
            const result$ = service.current();

            // expect
            const expected = cold('-(u|)', { u: { id: '1', email: 'test@test.com', pseudo: 'test' } });
            expect(result$).toBeObservable(expected);
        });
    });

    describe('login', () => {
        it('should return user if credentials are valid', () => {
            // given
            const email = 'test@test.com';
            const password = 'test';
            const user = { id: '1', email, pseudo: 'test' } as User;
            const credential = {} as any;

            // mock
            jest.spyOn(auth, 'setPersistence').mockResolvedValue();
            jest.spyOn(auth, 'signInWithEmailAndPassword').mockResolvedValue(credential);
            jest.spyOn(service, 'current').mockReturnValue(cold('-(u|)', { u: user }));
            // call
            const result = service.login(email, password, true);

            // expected
            const expected = cold('-(u|)', { u: user });
            expect(result).toBeObservable(expected);
        });
    });

    describe('logout', () => {
        it('should do nothing', () => {
            // mock
            jest.spyOn(auth, 'signOut').mockResolvedValue();

            // call
            const result = service.logout();

            // expected
            const expected = cold('');
            expect(result).toBeObservable(expected);
        });
    });

    describe('forgotPassword', () => {
        it('should do nothing', () => {
            // mock
            jest.spyOn(auth, 'sendPasswordResetEmail').mockResolvedValue();

            // call
            const result = service.forgotPassword('test@gùail.com');

            // expected
            const expected = cold('');
            expect(result).toBeObservable(expected);
        });
    });
});
