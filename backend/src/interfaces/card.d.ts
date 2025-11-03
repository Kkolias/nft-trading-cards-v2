import { CardRarity } from "../enums/cardRarity.enum";
import { Pack } from "./pack";

export interface Card {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  tokenId: number;
  rarity: CardRarity;
  supply: number;
  unboxCount: number;
  imageUrl: string;
  pack: Pack;
}
