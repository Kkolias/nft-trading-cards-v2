# Nestjs/PosgreSql/Typeorm project template

## setup

1. setup .env file from .env.example
2. check main.ts configs
3. check docker-compose.yml for configs
4. check package.json for configs

### setup commands
```bash
$ pnpm install

$ pnpm docker:compose

$ pnpm start:dev

$ pnpm migration:generate <name>

$ pnpm migration:run

# revert migration
$ pnpm migration:revert
```


