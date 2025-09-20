import { UserRole } from '../enums/userRole.enum';

export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    password: string;
    role: UserRole | null;
}