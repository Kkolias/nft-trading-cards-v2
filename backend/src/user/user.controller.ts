import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../interfaces/user';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() payload: CreateUserDto): Promise<{ error: string; success: string }> {
    return this.userService.signUp(payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  async updateUser(
    @Body() payload: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    return this.userService.update(payload, currentUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-all')
  async getUsers(@CurrentUser() user: User): Promise<User[]> {
    return this.userService.findAll(user);
  }

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const { error, token } = await this.userService.validateUser(email, password);
    if(error) {
      return { success: false, error };
    }
    return { success: true, token };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return user;
  }
}
