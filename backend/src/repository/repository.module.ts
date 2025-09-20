import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RepositoryService } from './repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
