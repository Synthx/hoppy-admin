import { User } from '../../models/user/user';
import { AppState } from '../app.state';
import { authSelector } from './auth.selector';

describe('auth.selector', () => {
    const user = { id: '1' } as User;
    const guestAppState = {
        auth: {
            loading: false,
            user: null,
        },
    } as AppState;
    const loggedAppState = {
        auth: {
            loading: false,
            user,
        },
    } as AppState;

    describe('user', () => {
        it('should return null if no current user', () => {
            const result = authSelector.user(guestAppState);
            expect(result).toBeNull();
        });

        it('should return current user if logged', () => {
            const result = authSelector.user(loggedAppState);
            expect(result).toBe(user);
        });
    });

    describe('isLogged', () => {
        it('should return true if current user', () => {
            const result = authSelector.isLogged(loggedAppState);
            expect(result).toBeTruthy();
        });

        it('should return false if no current user', () => {
            const result = authSelector.isLogged(guestAppState);
            expect(result).toBeFalsy();
        });
    });
});
