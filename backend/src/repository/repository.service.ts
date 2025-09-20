import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserStoreService } from './services/user-store';
import { PacksStoreService } from './services/packs-store';
import { CardsStoreService } from './services/cards-store';
import { OpensStoreService } from './services/opens-store';
import { TradesStoreService } from './services/trades-store';
import { PackEntity } from './entities/packs.entity';
import { CardEntity } from './entities/cards.entity';
import { OpenEntity } from './entities/opens.entity';
import { TradeEntity } from './entities/trades.entity';
import { MintedCardsStoreService } from './services/minted-cards-store';
import { MintedCardEntity } from './entities/minted-cards.entity';

@Injectable()
export class RepositoryService {
  public readonly userStore: UserStoreService;
  public readonly packsStore: PacksStoreService;
  public readonly cardsStore: CardsStoreService;
  public readonly opensStore: OpensStoreService;
  public readonly tradesStore: TradesStoreService;
  public readonly mintedCardsStore: MintedCardsStoreService;

  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
    @InjectRepository(PackEntity)
    private readonly packs: Repository<PackEntity>,
    @InjectRepository(CardEntity)
    private readonly cards: Repository<CardEntity>,
    @InjectRepository(OpenEntity)
    private readonly opens: Repository<OpenEntity>,
    @InjectRepository(TradeEntity)
    private readonly trades: Repository<TradeEntity>,
    @InjectRepository(MintedCardEntity)
    private readonly mintedCards: Repository<MintedCardEntity>,
  ) {
    this.userStore = new UserStoreService(this.user);
    this.packsStore = new PacksStoreService(this.packs);
    this.cardsStore = new CardsStoreService(this.cards);
    this.opensStore = new OpensStoreService(this.opens);
    this.tradesStore = new TradesStoreService(this.trades);
    this.mintedCardsStore = new MintedCardsStoreService(this.mintedCards);
  }
}
