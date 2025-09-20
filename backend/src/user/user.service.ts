import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user';
import { RepositoryService } from '../repository/repository.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { hashPassword } from './utils/hashPassword';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../auth/auth.service';
import { isAdmin } from '../utils/isAdmin';
import { errorForbidden } from '../utils/errorForbidden';

@Injectable()
export class UserService {
  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly authService: AuthService,
  ) {}

  async findAll(currentUser: User): Promise<User[]> {
    if (!isAdmin(currentUser)) errorForbidden();
    return await this.repositoryService.userStore.getUsers();
  }

  async signUp(user: CreateUserDto): Promise<{ error: string, success: string }> {
    const existingUser = await this.repositoryService.userStore.findByEmail(user.email);
    if (existingUser) {
      return { error: 'email in use', success: '' };
    }
    const newUser = await this.create(user);

    if(!newUser) {
      return { error: 'error creating user', success: '' };
    }

    const token = this.authService.generateToken(newUser);
    return { error: '', success: token };
  }

  async create(user: CreateUserDto): Promise<User> {
    const password = user.password;
    const hashedPassword = hashPassword(password);

    const userPayload = {
      ...user,
      password: hashedPassword,
    };

    return await this.repositoryService.userStore.save(userPayload);
  }

  async update(payload: UpdateUserDto, _currentUser: User): Promise<User> {
    // if (!isAdmin(currentUser)) errorForbidden();
    return await this.repositoryService.userStore.save(payload);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ error?: string; token?: string }> {
    const ERROR = {
      WRONG_PASSWORD: 'wrong password',
      NO_USER_FOUND: 'no user found',
    };
    const user = await this.repositoryService.userStore.findByEmail(email);
    if (!user) {
      return { error: ERROR.NO_USER_FOUND };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: ERROR.WRONG_PASSWORD };
    }

    const token = this.authService.generateToken(user);
    return { token };
  }
}
