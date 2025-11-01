import { TradeStatus } from '../../enums/TradeStatus.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/* 
esim id, token_id, seller_wallet, price, status (open/filled/canceled), created_at
*/

@Entity('trades')
export class TradeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'bigint' })
  tokenId: number;

  @Column()
  sellerWallet: string;

  @Column('numeric', { precision: 36, scale: 0 })
  priceWei: number;

  @Column({
    type: 'enum',
    enum: TradeStatus,
    default: TradeStatus.open,
  })
  status: TradeStatus;
}
