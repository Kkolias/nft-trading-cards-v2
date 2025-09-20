import { Pack } from './pack';

export interface OpenItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userWallet: string;
  pack: Pack;
  openedAt: Date;
}
