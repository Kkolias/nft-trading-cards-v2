# Backend
- Off-chain tallennus

# Contracts
- Smart contract

- käytetään ERC1155 multitoken standardia.
- kortit eivät ole käyttäjä kohtaisia vaan kortin tokenId voi olla useammalla käyttäjällä
- unique korttimahdollisuudet huonot. Kaikki tietyt kortit ovat samanlaisia keskenään.

## devaus

1. pnpm node
- localhost node päälle
2. npx hardhat compile
- compilaus varmistus
3. pnpm deploy:trading-cards
- deployaa
4. backend käyntiin -> cd backend pnpm start:dev

### jos kusee

1. npx hardhat clean
2. npm cache clean --force
3. poista ignition/deployments kansio


# Frontend
- käyttöliittymä





