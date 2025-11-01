import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Card } from '../../interfaces/card';

@Injectable()
export class CardsStoreService {
  constructor(private readonly cardsRepository: Repository<Card>) {}

  async save(payload: DeepPartial<Card>): Promise<Card> {
    return await this.cardsRepository.save(payload);
  }

  async findById(id: string): Promise<Card | null> {
    return this.cardsRepository.findOne({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        tokenId: true,
        rarity: true,
        imageUrl: true,
      },
    });
  }

  async getAll(): Promise<Card[]> {
    return this.cardsRepository.find();
  }
}
