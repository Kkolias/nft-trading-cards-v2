import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';

@Module({
  imports: [
    RepositoryModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}

