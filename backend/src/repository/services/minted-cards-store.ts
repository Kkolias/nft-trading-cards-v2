import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from '../../interfaces/card';
import { MintedCard } from 'src/interfaces/minted-cards';

@Injectable()
export class MintedCardsStoreService {
  constructor(private readonly mCardsRepository: Repository<MintedCard>) {}

  async save(payload: Partial<MintedCard>): Promise<MintedCard> {
    return await this.mCardsRepository.save(payload);
  }

  async findById(id: string): Promise<MintedCard | null> {
    return this.mCardsRepository.findOne({
      where: { id },
      relations: { card: true },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        tokenId: true,
        ownerWallet: true,
        mintedAt: true,
        card: {
            id: true,
            name: true
        }
      },
    });
  }

  async getAll(): Promise<MintedCard[]> {
    return this.mCardsRepository.find();
  }
}

