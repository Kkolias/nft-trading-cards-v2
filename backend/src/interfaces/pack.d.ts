import { Card } from "./card";
import { OpenItem } from "./open";

export interface Pack {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  configJson: Record<string, string | number | boolean>;
  cards: Card[];
  opens: OpenItem[];
}
