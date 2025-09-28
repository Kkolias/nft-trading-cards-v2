// seed few packs and cards for testing and easy db reset in development
import { DataSource } from 'typeorm';
import { PackEntity } from '../src/repository/entities/packs.entity';
import { CardEntity } from '../src/repository/entities/cards.entity';
import { CardRarity } from '../src/enums/cardRarity.enum';
import { OpenEntity } from 'src/repository/entities/opens.entity';
import { MintedCardEntity } from 'src/repository/entities/minted-cards.entity';
import { UserEntity } from 'src/repository/entities/user.entity';
import { hashPassword } from 'src/user/utils/hashPassword';
import { UserRole } from 'src/enums/userRole.enum';

async function seedDatabase(dataSource: DataSource) {
  await dataSource.initialize();
  console.log('Database initialized');
  const packRepository = dataSource.getRepository(PackEntity);
  const cardRepository = dataSource.getRepository(CardEntity);
  const openRepository = dataSource.getRepository(OpenEntity);
  const mintedCardRepository = dataSource.getRepository(MintedCardEntity);
  const userRepository = dataSource.getRepository(UserEntity);

  // Clear existing data
  await cardRepository.delete({});
  await packRepository.delete({});
  await openRepository.delete({});
  await mintedCardRepository.delete({});
  await userRepository.delete({});
  console.log('Existing data cleared');

  console.log("Create default root user");
  const user = {
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashPassword('password'),
    role: UserRole.admin
  }
  const savedUser: UserEntity = await userRepository.save(user)
  console.log("Saved User: ", savedUser)

  // Create packs
  const packs = [
    {
      name: 'Pack 1',
      description: 'description of pack 1',
      priceWei: 10000000000000000,
      imageUrl: '/image-url',
      configJson: {},
    },
    {
      name: 'Pack 2',
      description: 'description of pack 2',
      priceWei: 20000000000000000,
      imageUrl: '/image-url-2',
      configJson: {},
    },
    {
      name: 'Pack 3',
      description: 'description of pack 3',
      priceWei: 30000000000000000,
      imageUrl: '/image-url-3',
      configJson: {},
    },
  ];

  const savedPacks: PackEntity[] = [];
  for (const packData of packs) {
    const pack = packRepository.create(packData);
    const savedPack: PackEntity = await packRepository.save(pack);
    savedPacks.push(savedPack);
  }
  console.log('Packs saved:', savedPacks);

  // Create cards for each pack
  const cards = [
    // pack 1 cards
    {
      name: 'Card 1 of Pack 1',
      rarity: CardRarity.common,
      imageUrl: '/image-url',
      supply: 100000,
      pack: savedPacks[0],
    },
    {
      name: 'Card 2 of Pack 1',
      rarity: CardRarity.rare,
      imageUrl: '/image-url-2',
      supply: 50000,
      pack: savedPacks[0],
    },
    // pack 2 cards
    {
      name: 'Card 1 of Pack 2',
      rarity: CardRarity.rare,
      imageUrl: '/image-url-2',
      supply: 50000,
      pack: savedPacks[1],
    },
    {
      name: 'Card 2 of Pack 2',
      rarity: CardRarity.legendary,
      imageUrl: '/image-url-3',
      supply: 1000,
      pack: savedPacks[1],
    },

    // pack 3 cards
    {
      name: 'Card 1 of Pack 3',
      rarity: CardRarity.epic,
      imageUrl: '/image-url-3',
      supply: 10000,
      pack: savedPacks[2],
    },
    {
      name: 'Card 2 of Pack 3',
      rarity: CardRarity.legendary,
      imageUrl: '/image-url-4',
      supply: 1000,
      pack: savedPacks[2],
    },
    {
      name: 'Card 3 of Pack 3',
      rarity: CardRarity.common,
      imageUrl: '/image-url-5',
      supply: 10000,
      pack: savedPacks[2],
    },
  ];

  const savedCards: CardEntity[] = [];
  for (const cardData of cards) {
    const card = cardRepository.create(cardData);
    const savedCard: CardEntity = await cardRepository.save(card);
    savedCards.push(savedCard);
  }
  console.log('Cards saved:', savedCards);
  console.log('Database seeding completed.');
  await dataSource.destroy();

  process.exit(0);
}

// Run the seed script for postgres connection
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'username',
  password: 'password',
  database: 'nestdb',
  // entities: ['dist/src/repository/entities/*.entity{.ts,.js}'],
  entities: [PackEntity, CardEntity, OpenEntity, MintedCardEntity, UserEntity],
  synchronize: true,
});
seedDatabase(dataSource).catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});