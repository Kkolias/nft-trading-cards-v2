import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Trade } from '../../interfaces/trade';

@Injectable()
export class TradesStoreService {
  constructor(private readonly tradesRepository: Repository<Trade>) {}

  async save(payload: Partial<Trade>): Promise<Trade> {
    return await this.tradesRepository.save(payload);
  }

  async findById(id: string): Promise<Trade | null> {
    return this.tradesRepository.findOne({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        sellerWallet: true,
        tokenId: true,
        price: true,
        status: true,
      },
    });
  }

  async getAll(): Promise<Trade[]> {
    return this.tradesRepository.find();
  }
}
