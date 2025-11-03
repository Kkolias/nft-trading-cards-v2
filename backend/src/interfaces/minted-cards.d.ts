import { Card } from "./card";

export interface MintedCard {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  card: Card;
  amount: number;
  ownerWallet: string;
  mintedAt: Date;
}
