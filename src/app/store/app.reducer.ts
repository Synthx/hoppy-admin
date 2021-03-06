import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { settingsReducer } from './settings/settings.reducer';
import { userReducer } from './user/user.reducer';

export const appReducer: ActionReducerMap<AppState> = {
    settings: settingsReducer,
    auth: authReducer,
    user: userReducer,
    router: routerReducer,
};
