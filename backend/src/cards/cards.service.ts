import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { User } from '../interfaces/user';
import { errorForbidden } from '../utils/errorForbidden';
import { isAdmin } from '../utils/isAdmin';
import { Card } from '../interfaces/card';
import { CreateCardPayloadDto, UpdateCardPayloadDto } from './dto/cards.dto';
import { TradingCardsContract } from '../blockchain/trading-cards.contract';

@Injectable()
export class CardsService {
  constructor(
    private readonly repositoryService: RepositoryService,
    readonly tradingCardsContract: TradingCardsContract,
  ) {}

  async createCard(payload: CreateCardPayloadDto, user: User): Promise<Card> {
    if (!isAdmin(user)) errorForbidden();

    const { packId, ...rest } = payload;
    const cardPayload = {
      ...rest,
      pack: { id: packId },
    };
    const newCard = await this.repositoryService.cardsStore.save(cardPayload);
    console.log("New card created:", newCard);
    const c = await this.tradingCardsContract.createNewCard(newCard.tokenId);
    console.log('Created new card on-chain:', c);
    return newCard;
  }

  async updateCard(payload: UpdateCardPayloadDto, user: User): Promise<Card> {
    if (!isAdmin(user)) errorForbidden();

    return await this.repositoryService.cardsStore.save(payload);
  }
}
