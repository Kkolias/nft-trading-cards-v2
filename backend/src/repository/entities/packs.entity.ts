/*
esim id (PK), name, price, config_json (korttien todennäköisyydet)
*/

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardEntity } from './cards.entity';
import { OpenEntity } from './opens.entity';

@Entity('packs')
export class PackEntity {
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

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('jsonb')
  configJson: Record<string, string | number | boolean>;

  @OneToMany(() => CardEntity, (card) => card.pack)
  cards: CardEntity[];

  @OneToMany(() => OpenEntity, (open) => open.pack)
  opens: OpenEntity[];
}
