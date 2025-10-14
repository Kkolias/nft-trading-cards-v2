import { Card } from "./card";
import { OpenItem } from "./open";

export interface Pack {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  imageUrl: string;
  priceWei: number;
  configJson: Record<string, string | number | boolean>;
  onChainId: number;
  cards: Card[];
  opens: OpenItem[];
}
