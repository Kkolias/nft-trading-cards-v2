import { TradeStatus } from "../enums/TradeStatus.enum";

export interface Trade {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  tokenId: string;
  sellerWallet: string;
  price: number;
  status: TradeStatus;
}
