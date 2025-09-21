import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [PublicController],
  providers: [PublicService],
  exports: [PublicService],
})
export class PublicModule {}
