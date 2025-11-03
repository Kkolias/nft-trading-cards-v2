import { DeepPartial } from 'typeorm';
import { RepositoryService } from '../../repository/repository.service';
import { UnboxingService } from '../unboxing.service';
import {
  CardPick,
  UnboxCardRandomizerV1,
} from '../../algorithms/v1/unboxCardRandomizer';
import { MintedCard } from '../../interfaces/minted-cards';
import { TradingCardsContract } from '../../blockchain/trading-cards.contract';
import { Card } from '../../interfaces/card';
import { ethers } from 'ethers';

export class PackUnboxHandler {
  readonly repositoryService: RepositoryService;
  readonly tradingCardsContract: TradingCardsContract;
  readonly unboxCardRandomizer: UnboxCardRandomizerV1 =
    new UnboxCardRandomizerV1();
  constructor(readonly unboxingService: UnboxingService) {
    this.repositoryService = unboxingService.repositoryService;
    this.tradingCardsContract = unboxingService.tradingCardsContract;
  }

  async unboxPack(packId: string, userAddress: string) {
    const packWithCards =
      await this.repositoryService.packsStore.findByIdWithCards(packId);
    if (!packWithCards) {
      throw new Error('Pack not found');
    }

    const cards = packWithCards.cards;
    const numberOfCardsToUnbox = 5;
    const unboxedCards: CardPick[] =
      this.unboxCardRandomizer.getRandomCardsFromPool(
        cards,
        numberOfCardsToUnbox,
      );

    // return unboxedCards
    return await this.mintUnboxedCardsToUser(userAddress, unboxedCards);
  }

  private async mintUnboxedCardsToUser(
    userAddress: string,
    cards: CardPick[],
  ): Promise<CardPick[]> {
    for (const c of cards) {
      await this.mintCardToUser(userAddress, c.card, c.amount);
    }
    return cards;
  }

  private async mintCardToUser(
    userAddress: string,
    card: Card,
    amount: number,
  ) {
    const { tokenId, id: cardId } = card;
    const receipt: ethers.TransactionReceipt =
      await this.tradingCardsContract.mintCardToUser(
        tokenId,
        userAddress,
        amount,
      );
    await new Promise((res) => setTimeout(res, 200)); // 200ms pieni tauko for dev autominer
    console.log('!!!!!! Minted card on-chain:', receipt.status);
    const mintedAt = new Date();
    if (!this.mintSuccess(receipt)) {
      throw new Error('Minting failed on-chain');
    }

    const mintedCardPayload: DeepPartial<MintedCard> = {
      card: {
        id: cardId,
      },
      amount: amount,
      ownerWallet: userAddress,
      mintedAt,
    };
    return await this.repositoryService.mintedCardsStore.save(
      mintedCardPayload,
    );
  }

  private mintSuccess(receipt: ethers.TransactionReceipt): boolean {
    return receipt.status === 1;
  }
}
