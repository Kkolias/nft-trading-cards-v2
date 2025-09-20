import { UserRole } from "../enums/userRole.enum";
import { User } from "../interfaces/user";



export function isAdmin(user: User): boolean {
    console.log(user)
  return user?.role === UserRole.admin;
}