import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { ContractsModule } from '../blockchain/trading-cards-contract.module';
import { UnboxingService } from './unboxing.service';
import { UnboxingController } from './unboxing.controller';

@Module({
  imports: [RepositoryModule, ContractsModule],
  controllers: [UnboxingController],
  providers: [UnboxingService],
  exports: [UnboxingService],
})
export class UnboxingModule {}
