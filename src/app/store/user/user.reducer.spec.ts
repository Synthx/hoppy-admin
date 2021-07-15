import { User } from '../../models/user/user';
import { authAction } from '../auth/auth.action';
import { authInitialState, authReducer } from '../auth/auth.reducer';
import { userAction } from './user.action';
import { userInitialState, userReducer } from './user.reducer';

describe('user.reducer', () => {
    it('should have an initial state', () => {
        const state = userReducer(userInitialState, { type: 'NOOP' });

        expect(state).toBeDefined();
    });

    describe('user/create', () => {
        describe('basic', () => {
            const user = { email: 'test@hoppy.com' } as User;
            const action = userAction.create({ user });
            const state = userReducer(userInitialState, action);

            it('should start loading', () => {
                expect(state.loading).toBeTruthy();
            });
        });

        describe('success', () => {
            const user = { email: 'test@hoppy.com' } as User;
            const action = userAction.createSuccess({ user });
            const state = userReducer(userInitialState, action);

            it('should stop loading', () => {
                expect(state.loading).toBeFalsy();
            });
        });

        describe('error', () => {
            const action = userAction.createError({ error: 'oops' });
            const state = userReducer(userInitialState, action);

            it('should stop loading', () => {
                expect(state.loading).toBeFalsy();
            });
        });
    });
});
