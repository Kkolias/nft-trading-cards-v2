import { TradeStatus } from 'src/enums/TradeStatus.enum';
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

  @Column()
  tokenId: string;

  @Column()
  sellerWallet: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: TradeStatus,
    default: TradeStatus.open,
  })
  status: TradeStatus;
}
