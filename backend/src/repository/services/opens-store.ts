import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { OpenItem } from '../../interfaces/open';

@Injectable()
export class OpensStoreService {
  constructor(private readonly opensRepository: Repository<OpenItem>) {}

  async save(payload: DeepPartial<OpenItem>): Promise<OpenItem> {
    return await this.opensRepository.save(payload);
  }

  async findById(id: string): Promise<OpenItem | null> {
    return this.opensRepository.findOne({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        userWallet: true,
        openedAt: true
      },
    });
  }

  async existsForTxHash(txHash: string): Promise<boolean> {
    const count = await this.opensRepository.count({ where: { txHash } });
    return count > 0;
  }

  async getAll(): Promise<OpenItem[]> {
    return this.opensRepository.find();
  }
}
