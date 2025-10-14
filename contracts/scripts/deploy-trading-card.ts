// scripti jolla deployataan TradingCard sopimus
// tallennetaan contract address .env tiedostoon
// ja abi tiedostoon contract-config.json
// import { ethers }  from "hardhat";
// const ethers = require("ethers");
// import fs from "fs";

// async function main() {
//   const TradingCards = await ethers.getContractFactory("TradingCards");
//   const tradingCards = await TradingCards.deploy();

//   // tallennetaan contract address .env tiedostoon
//   fs.appendFileSync(
//     "../backend/.env",
//     `CONTRACT_ADDRESS=${tradingCards.address}\n`
//   );

//   // tallennetaan abi tiedostoon contract-config.json
//   fs.writeFileSync(
//     "../backend/contract-config.json",
//     JSON.stringify(tradingCards.interface)
//   );
//   console.log("TradingCards deployed to:", tradingCards.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
// // npx hardhat run contracts/scripts/deploy-trading-card.ts --network localhost
import hre from "hardhat";
const { ethers } = hre as any;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with:", deployer.address);

  const TradingCards = await ethers.getContractFactory("TradingCards");
  const contract = await TradingCards.deploy();

  await contract.waitForDeployment();
  console.log("TradingCards deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});