import { RouterReducerState } from '@ngrx/router-store';
import { AuthState } from './auth/auth.state';
import { SettingsState } from './settings/settings.state';
import { UserState } from './user/user.state';

export interface AppState {
    settings: SettingsState;
    auth: AuthState;
    user: UserState;
    router: RouterReducerState;
}
