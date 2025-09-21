import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Pack } from '../../interfaces/pack';

@Injectable()
export class PacksStoreService {
  constructor(private readonly packsRepository: Repository<Pack>) {}

  async save(payload: DeepPartial<Pack>): Promise<Pack> {
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
        priceWei: true,
        description: true,
        imageUrl: true,
      },
    });
  }

  async getAll(): Promise<Pack[]> {
    return this.packsRepository.find({
      relations: { cards: true },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        priceWei: true,
        description: true,
        imageUrl: true,
        cards: {
          id: true,
          name: true,
        },
      },
    });
  }
}
