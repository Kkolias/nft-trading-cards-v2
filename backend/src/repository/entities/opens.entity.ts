/*
esim id, user_wallet, pack_id, tx_hash, opened_at
*/

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PackEntity } from './packs.entity';

@Entity('opens')
export class OpenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userWallet: string;

  // unique transaction hash for the open action
  @Column({ type: 'varchar', unique: true })
  txHash: string;

  @ManyToOne(() => PackEntity, (pack) => pack.opens)
  @JoinColumn({ name: 'pack_id' })
  pack: PackEntity;

  @Column({ type: 'timestamptz' })
  openedAt: Date;
}
