
import { Module } from '@nestjs/common';
import { TradingCardsContract } from './trading-cards.contract';

@Module({
  providers: [TradingCardsContract],
  exports: [TradingCardsContract], // <-- tärkeä jos haluat käyttää muualla
})
export class ContractsModule {}