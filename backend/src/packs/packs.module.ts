import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { PacksService } from './packs.service';
import { PacksController } from './packs.controller';

@Module({
  imports: [
    RepositoryModule,
  ],
  controllers: [PacksController],
  providers: [PacksService],
  exports: [PacksService],
})
export class PacksModule {}


