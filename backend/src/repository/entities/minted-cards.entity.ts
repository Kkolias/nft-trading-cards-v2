/* 
esim id (PK), token_id (on-chain), card_id (FK cards.id), owner_wallet, minted_at
*/

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardEntity } from './cards.entity';

@Entity('minted_cards')
export class MintedCardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  tokenId: string;

  @OneToOne(() => CardEntity)
  @JoinColumn({ name: 'card_id' })
  card: CardEntity;

  @Column()
  ownerWallet: string;

  @Column({ type: 'timestamptz' })
  mintedAt: Date;
}
