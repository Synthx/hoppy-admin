import { User } from '../../models/user';
import { authAction } from './auth.action';
import { authInitialState, authReducer } from './auth.reducer';

describe('auth.reducer', () => {
    it('should have an initial state', () => {
        const state = authReducer(authInitialState, { type: 'NOOP' });

        expect(state).toBeDefined();
    });

    describe('auth/load', () => {
        describe('basic', () => {
            const action = authAction.load();
            const state = authReducer(authInitialState, action);

            it('should start loading', () => {
                expect(state.loading).toBeTruthy();
            });

            it('should reset user', () => {
                expect(state.user).toBeNull();
            });
        });

        describe('success', () => {
            const user = { id: '1' } as User;
            const action = authAction.loadSuccess({ user });
            const state = authReducer(authInitialState, action);

            it('should stop loading', () => {
                expect(state.loading).toBeFalsy();
            });

            it('should set current user', () => {
                expect(state.user).toBe(user);
            });
        });

        describe('error', () => {
            const action = authAction.loadError({ error: 'oops' });
            const state = authReducer(authInitialState, action);

            it('should stop loading', () => {
                expect(state.loading).toBeFalsy();
            });
        });
    });

    describe('auth/login', () => {
        describe('basic', () => {
            const action = authAction.login({ email: '', password: '' });
            const state = authReducer(authInitialState, action);

            it('should start loading', () => {
                expect(state.loading).toBeTruthy();
            });
        });

        describe('success', () => {
            const user = { id: '1' } as User;
            const action = authAction.loginSuccess({ user });
            const state = authReducer(authInitialState, action);

            it('should stop loading', () => {
                expect(state.loading).toBeFalsy();
            });

            it('should set user', () => {
                expect(state.user).toBe(user);
            });
        });

        describe('error', () => {
            const action = authAction.loginError({ error: 'oops' });
            const state = authReducer(authInitialState, action);

            it('should stop loading', () => {
                expect(state.loading).toBeFalsy();
            });
        });
    });
});
