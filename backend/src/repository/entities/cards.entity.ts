/*
esim id (PK), name, rarity, image_url, power, series (FK card_series.id)
*/

import { CardRarity } from 'src/enums/cardRarity.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardSeriesEntity } from './card-series.entity';

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

  @ManyToOne(() => CardSeriesEntity, (series) => series.cards)
  @JoinColumn({ name: 'series_id' })
  serie: CardSeriesEntity;
}
