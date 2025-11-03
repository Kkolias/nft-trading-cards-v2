// v1 cards unbox randomizer algorithm
// super simple just picks the first available card based on unboxCount < supply
// each rarity has own change percentage to appear

import { CardRarity } from '../../enums/cardRarity.enum';
import { Card } from '../../interfaces/card';

export interface CardPick {
    card: Card;
    amount: number;
}

const RARITY_CHANCES: { [key: string]: number } = {
  [CardRarity.common]: 70, // 70 out of 100
  [CardRarity.rare]: 20, // 20 out of 100
  [CardRarity.epic]: 9, // 9 out of 100
  [CardRarity.legendary]: 1, // 1 out of 100
};

export class UnboxCardRandomizerV1 {
  private readonly rarityChances = RARITY_CHANCES;

  getRandomCardsFromPool(
    cardsToPickFrom: Card[],
    numberOfCardsToPick: number,
  ): CardPick[] {
    const initialAvailableCards = this.getAvailableSupplyCards(cardsToPickFrom);

    const pickedCards: CardPick[] = [];

    while (this.getPickedCardCount(pickedCards) < numberOfCardsToPick) {
      const randomNum = Math.floor(Math.random() * 100) + 1;
      let cumulativeChance = 0;
      let selectedRarity: CardRarity | null = null;
      for (const rarity in this.rarityChances) {
        cumulativeChance += this.rarityChances[rarity];
        if (randomNum <= cumulativeChance) {
          selectedRarity = rarity as CardRarity;
          break;
        }
      }

      if (selectedRarity) {
        const availableCards = initialAvailableCards.filter(
          (card) => card.rarity === selectedRarity,
        );
        if (availableCards.length > 0) {
          const randomCard =
            availableCards[Math.floor(Math.random() * availableCards.length)];
          if (!this.isCardOverSupply(randomCard, pickedCards)) {
            const existingCard = pickedCards.find(
              (c) => c.card.id === randomCard.id,
            );
            if (existingCard) {
              existingCard.amount++;
            } else {
              pickedCards.push({ card: randomCard, amount: 1 });
            }
          }
        }
      }
    }

    return pickedCards;
  }

  private getPickedCardCount(
    pickedCards: { card: Card; amount: number }[],
  ): number {
    return pickedCards.reduce((acc, c) => acc + c.amount, 0);
  }

  private isCardOverSupply(
    card: Card,
    pickedCards: { card: Card; amount: number }[],
  ): boolean {
    const alreadyPickedCount = pickedCards
      .filter((c) => c.card.id === card.id)
      .reduce((acc, c) => acc + c.amount, 0);
    return card.unboxCount + alreadyPickedCount >= card.supply;
  }

  private getAvailableSupplyCards(cards: Card[]): Card[] {
    return cards.filter((card) => card.unboxCount < card.supply);
  }
}
