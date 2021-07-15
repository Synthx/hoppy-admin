import { AppState } from '../app.state';
import { userSelector } from './user.selector';

describe('user.selector', () => {
    const appState = {
        user: {
            loading: false,
        },
    } as AppState;

    describe('loading', () => {
        it('should return current loading state', () => {
            const result = userSelector.loading(appState);
            expect(result).toBeFalsy();
        });
    });
});
