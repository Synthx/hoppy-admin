import { startLoading, stopLoading } from './loading.functions';
import { initialLoadingState, LoadingState } from './loading.state';

interface TestState {
    loading: LoadingState;
}

describe('loading.functions', () => {
    const initialState: TestState = {
        loading: initialLoadingState,
    };

    describe('startLoading', () => {
        const result = startLoading('create', initialState);

        it('should only update desired property', () => {
            expect(result.loading.create).toBeTruthy();
        });
    });

    describe('stopLoading', () => {
        const state = startLoading('remove', initialState);
        const result = stopLoading('remove', state);

        it('should not update previous state', () => {
            expect(state.loading.remove).toBeTruthy();
        });

        it('should only update desired property', () => {
            expect(result.loading.remove).toBeFalsy();
        });
    });
});
