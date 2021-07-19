import { Auditable } from '../crud/auditable';
import { UserRole } from './user-role';

export interface User extends Auditable {
    id: string;
    email: string;
    pseudo: string;
    role: UserRole;
    avatar?: string;
    emailVerified?: boolean;
    disabled?: boolean;
}
