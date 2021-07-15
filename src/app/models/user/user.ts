import { UserRole } from './user-role';

export interface User {
    id: string;
    email: string;
    pseudo: string;
    role: UserRole;
    avatar?: string;
    emailVerified?: boolean;
    disabled?: boolean;
}
