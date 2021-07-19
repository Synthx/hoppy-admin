import { CrudOperation } from '../../models/crud/crud-operation';
import { LoadingState } from './loading.state';

export function stopLoading<S extends { loading: LoadingState }>(type: CrudOperation, state: S): S {
    return {
        ...state,
        loading: {
            ...state.loading,
            [type]: false,
        },
    };
}

export function startLoading<S extends { loading: LoadingState }>(type: CrudOperation, state: S): S {
    return {
        ...state,
        loading: {
            ...state.loading,
            [type]: true,
        },
    };
}
