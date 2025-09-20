import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pack } from '../../interfaces/pack';

@Injectable()
export class PacksStoreService {
  constructor(private readonly packsRepository: Repository<Pack>) {}

  async save(payload: Partial<Pack>): Promise<Pack> {
    return await this.packsRepository.save(payload);
  }

  async findById(id: string): Promise<Pack | null> {
    return this.packsRepository.findOne({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        price: true,
        description: true,
        imageUrl: true,
      },
    });
  }

  async getAll(): Promise<Pack[]> {
    return this.packsRepository.find();
  }
}
