import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../repository/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: UserEntity): string {
    const payload = { sub: user.id, email: user.email, name: user.name, role: user.role };
    return this.jwtService.sign(payload);
  }
}
