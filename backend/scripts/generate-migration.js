const { execSync } = require('child_process');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error(
    '❌ Virhe: Anna migraation nimi. Esim: pnpm migration:generate MyMigration',
  );
  process.exit(1);
}

const fullMigrationName = `${migrationName}`;

console.log(`🔹 Generoidaan migraatio: ${fullMigrationName}...`);

// Tunnista pakettimanageri (pnpm, yarn, npm)
const packageManager = process.env.npm_execpath.includes('pnpm')
  ? 'pnpm'
  : process.env.npm_execpath.includes('yarn')
    ? 'yarn'
    : 'npm run';

try {
  // Käännä TypeScript ennen migraation generointia
  console.log('🔄 Käännetään TypeScript...');
  execSync(`${packageManager} tsc`, { stdio: 'inherit' });

  // Luo migraatio
  execSync(
    `${packageManager} typeorm migration:generate ./src/migrations/${fullMigrationName}`,
    { stdio: 'inherit' },
  );
  console.log('✅ Migraatio luotu onnistuneesti!');
} catch (error) {
  console.error('❌ Virhe migraation generoinnissa:', error.message);
  process.exit(1);
}
