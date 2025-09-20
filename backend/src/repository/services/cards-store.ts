import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from '../../interfaces/card';

@Injectable()
export class CardsStoreService {
  constructor(private readonly cardsRepository: Repository<Card>) {}

  async save(payload: Partial<Card>): Promise<Card> {
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
        rarity: true,
        imageUrl: true,
      },
    });
  }

  async getAll(): Promise<Card[]> {
    return this.cardsRepository.find();
  }
}
