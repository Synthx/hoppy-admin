import { RouterReducerState } from '@ngrx/router-store';
import { AuthState } from './auth/auth.state';
import { SettingsState } from './settings/settings.state';

export interface AppState {
    settings: SettingsState;
    auth: AuthState;
    router: RouterReducerState;
}
