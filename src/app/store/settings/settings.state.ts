import { DeviceMode } from '../../models/device-mode';

export interface SettingsState {
    loading: boolean;
    navigationOpened: boolean;
    fullscreenOpened: boolean;
    language: string;
    deviceMode: DeviceMode;
}
