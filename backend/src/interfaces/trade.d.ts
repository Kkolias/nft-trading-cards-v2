import { TradeStatus } from "../enums/TradeStatus.enum";

export interface Trade {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  tokenId: number;
  sellerWallet: string;
  priceWei: number;
  status: TradeStatus;
}
