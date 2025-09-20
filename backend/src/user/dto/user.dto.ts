import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRole } from 'src/enums/userRole.enum';

export class IdDto {
    @IsUUID()
    id: string;
}

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}