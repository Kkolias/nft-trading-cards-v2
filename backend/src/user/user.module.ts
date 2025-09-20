import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RepositoryModule } from '../repository/repository.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    RepositoryModule,
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
