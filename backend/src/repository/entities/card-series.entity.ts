import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardEntity } from './cards.entity';

@Entity('card_series')
export class CardSeriesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => CardEntity, (card) => card.series)
  cards: CardEntity[];
}
