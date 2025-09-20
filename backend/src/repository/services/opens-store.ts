import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OpenItem } from '../../interfaces/open';

@Injectable()
export class OpensStoreService {
  constructor(private readonly opensRepository: Repository<OpenItem>) {}

  async save(payload: Partial<OpenItem>): Promise<OpenItem> {
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

  async getAll(): Promise<OpenItem[]> {
    return this.opensRepository.find();
  }
}
