/*
esim id (PK), name, rarity, image_url, power, series (FK pack_id)
*/

import { CardRarity } from '../../enums/cardRarity.enum';
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

@Entity('cards')
export class CardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CardRarity,
    default: CardRarity.common,
  })
  rarity: CardRarity;

  @Column()
  imageUrl: string;

  @Column({ type: 'int' })
  supply: number; // max possible supply with int is 2,147,483,647

  @ManyToOne(() => PackEntity, (pack) => pack.cards)
  @JoinColumn({ name: 'pack_id' })
  pack: PackEntity;
}
