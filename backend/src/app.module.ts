import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryModule } from './repository/repository.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { UserModule } from './user/user.module';
import { CardsModule } from './cards/cards.module';
import { PublicModule } from './public/public.module';
import { PacksModule } from './packs/packs.module';
import { ContractsModule } from './blockchain/trading-cards-contract.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    RepositoryModule,
    AuthModule,
    UserModule,
    CardsModule,
    PublicModule,
    PacksModule,
    ContractsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
