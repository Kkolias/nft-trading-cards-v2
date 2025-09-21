import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { CreatePackDto, UpdatePackDto } from './dto/packs.dto';
import { isAdmin } from '../utils/isAdmin';
import { errorForbidden } from '../utils/errorForbidden';
import { User } from '../interfaces/user';
import { Pack } from '../interfaces/pack';

@Injectable()
export class PacksService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async createPack(payload: CreatePackDto, user: User): Promise<Pack> {
    if (!isAdmin(user)) errorForbidden();

    const { cardIdList, ...rest } = payload;
    const packPayload = {
      ...rest,
      cards: cardIdList.map((id) => ({ id })),
    };
    return await this.repositoryService.packsStore.save(packPayload);
  }

  async updatePack(payload: UpdatePackDto, user: User): Promise<Pack> {
    if (!isAdmin(user)) errorForbidden();

    const { cardIdList, ...rest } = payload;
    if (cardIdList) {
      const packPayload = {
        ...rest,
        cards: cardIdList.map((id) => ({ id })),
      };
      return await this.repositoryService.packsStore.save(packPayload);
    }

    return await this.repositoryService.packsStore.save(payload);
  }
}
