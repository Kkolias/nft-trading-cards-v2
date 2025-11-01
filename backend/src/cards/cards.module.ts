import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { ContractsModule } from '../blockchain/trading-cards-contract.module';

@Module({
  imports: [
    RepositoryModule,
    ContractsModule
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}

