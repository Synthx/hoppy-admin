import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer[] = environment.production ? [] : [debug];
