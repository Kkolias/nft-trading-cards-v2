import { Card } from "./card";

export interface MintedCard {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  tokenId: number;
  card: Card;
  ownerWallet: string;
  mintedAt: Date;
}
