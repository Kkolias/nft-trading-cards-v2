import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserStoreService } from './services/user-store';

@Injectable()
export class RepositoryService {
  public readonly userStore: UserStoreService;

  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
  ) {
    this.userStore = new UserStoreService(this.user);
  }
}
