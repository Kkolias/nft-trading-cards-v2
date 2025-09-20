import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../interfaces/user';

@Injectable()
export class UserStoreService {
  constructor(private readonly userRepository: Repository<User>) {}

  async save(payload: Partial<User>): Promise<User> {
    return await this.userRepository.save(payload);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
