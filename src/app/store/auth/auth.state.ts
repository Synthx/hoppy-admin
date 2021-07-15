import { User } from '../../models/user/user';

export interface AuthState {
    user: User | null;
    loading: boolean;
}
