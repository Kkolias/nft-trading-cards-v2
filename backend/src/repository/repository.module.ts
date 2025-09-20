import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RepositoryService } from './repository.service';
import { PackEntity } from './entities/packs.entity';
import { CardEntity } from './entities/cards.entity';
import { OpenEntity } from './entities/opens.entity';
import { TradeEntity } from './entities/trades.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PackEntity,
      CardEntity,
      OpenEntity,
      TradeEntity,
    ]),
  ],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
