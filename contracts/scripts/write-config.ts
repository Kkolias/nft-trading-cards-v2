import fs from "fs";

async function main() {
  //   const contractABI = JSON.parse(
  //     fs.readFileSync(
  //       "./artifacts/contracts/tradingCardNFT.sol/TradingCardNFT.json",
  //       "utf8"
  //     )
  //   ).abi;
  const contractABI = JSON.parse(
    fs.readFileSync(
      "./ignition/deployments/chain-31337/artifacts/TradingCardsModule#TradingCards.json",
      "utf8"
    )
  ).abi;

  fs.writeFileSync(
    "../backend/contract-config.json",
    JSON.stringify({ contractABI }, null, 2)
  );
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
