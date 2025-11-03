import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { MintedCard } from 'src/interfaces/minted-cards';

@Injectable()
export class MintedCardsStoreService {
  constructor(private readonly mCardsRepository: Repository<MintedCard>) {}

  async save(payload: DeepPartial<MintedCard>): Promise<MintedCard> {
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
        ownerWallet: true,
        mintedAt: true,
        card: {
            id: true,
            name: true
        }
      },
    });
  }

  async findByAddress(address: string): Promise<MintedCard[]> {
    return this.mCardsRepository.find({
      where: { ownerWallet: address },
      relations: { card: true },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        ownerWallet: true,
        mintedAt: true,
        amount: true,
        card: {
            id: true,
            rarity: true,
            name: true
        },
      }
    });
  }

  async getAll(): Promise<MintedCard[]> {
    return this.mCardsRepository.find();
  }
}

