import { CardRarity } from "../enums/cardRarity.enum";
import { Pack } from "./pack";

export interface Card {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  rarity: CardRarity;
  imageUrl: string;
  pack: Pack;
}
