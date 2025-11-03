import { Injectable } from '@nestjs/common';
import { TradingCardsContract } from '../blockchain/trading-cards.contract';
import { RepositoryService } from '../repository/repository.service';
import { CardPick } from 'src/algorithms/v1/unboxCardRandomizer';
import { PackUnboxHandler } from './utils/packUnboxHandler';
import { MintedCard } from 'src/interfaces/minted-cards';

@Injectable()
export class UnboxingService {
  readonly packUnboxHandler: PackUnboxHandler;
  constructor(
    readonly repositoryService: RepositoryService,
    readonly tradingCardsContract: TradingCardsContract,
  ) {
    this.packUnboxHandler = new PackUnboxHandler(this);
  }

  async unboxPack(packId: string, userAddress: string): Promise<CardPick[]> {
    return this.packUnboxHandler.unboxPack(packId, userAddress);
  }

  async getAddressUnboxedCards(address: string): Promise<MintedCard[]> {
    return this.repositoryService.mintedCardsStore.findByAddress(address);
  }
}
