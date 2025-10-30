import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { CreatePackDto, UpdatePackDto } from './dto/packs.dto';
import { isAdmin } from '../utils/isAdmin';
import { errorForbidden } from '../utils/errorForbidden';
import { User } from '../interfaces/user';
import { Pack } from '../interfaces/pack';
import { TradingCardsContract } from '../blockchain/trading-cards.contract';

@Injectable()
export class PacksService {
  constructor(
    private readonly repositoryService: RepositoryService,
    readonly tradingCardsContract: TradingCardsContract,
  ) {}

  async createPack(payload: CreatePackDto, user: User): Promise<Pack> {
    if (!isAdmin(user)) errorForbidden();

    const { cardIdList, ...rest } = payload;
    const packPayload = {
      ...rest,
      cards: cardIdList.map((id) => ({ id })),
    };
    const newPack = await this.repositoryService.packsStore.save(packPayload);
    console.log("New pack created:", newPack);

    const c = await this.tradingCardsContract.initNewPack(newPack.onChainId, newPack.priceWei);
    console.log('Initialized new pack on-chain:', c);

    return newPack;
    // return await this.repositoryService.packsStore.save(newPack);
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

  testContractInstance() {
    return this.tradingCardsContract.getInstance();
  }
}
