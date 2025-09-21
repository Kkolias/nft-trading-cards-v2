import { Injectable } from '@nestjs/common';
import { Card } from '../interfaces/card';
import { RepositoryService } from '../repository/repository.service';
import { Pack } from 'src/interfaces/pack';

@Injectable()
export class PublicService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async getCardById(id: string): Promise<Card | null> {
    return await this.repositoryService.cardsStore.findById(id);
  }

  async getAllCards(): Promise<Card[]> {
    return await this.repositoryService.cardsStore.getAll();
  }

  async getAllPacks(): Promise<Pack[]> {
    return await this.repositoryService.packsStore.getAll();
  }
}
