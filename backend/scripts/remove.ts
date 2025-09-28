// seed few packs and cards for testing and easy db reset in development
import { DataSource } from 'typeorm';
import { PackEntity } from '../src/repository/entities/packs.entity';
import { CardEntity } from '../src/repository/entities/cards.entity';
import { OpenEntity } from 'src/repository/entities/opens.entity';
import { MintedCardEntity } from 'src/repository/entities/minted-cards.entity';

async function seedDatabase(dataSource: DataSource) {
  await dataSource.initialize();
  console.log('Database initialized');
  const packRepository = dataSource.getRepository(PackEntity);
  const cardRepository = dataSource.getRepository(CardEntity);
  const openRepository = dataSource.getRepository(OpenEntity);
  const mintedCardRepository = dataSource.getRepository(MintedCardEntity);

  // Clear existing data
  await cardRepository.delete({});
  await packRepository.delete({});
  await openRepository.delete({});
  await mintedCardRepository.delete({});
  console.log('Existing data cleared');

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
  entities: [PackEntity, CardEntity, OpenEntity, MintedCardEntity],
  synchronize: true,
});
seedDatabase(dataSource).catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
