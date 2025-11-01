import fs from "fs";

async function main() { 
  const contractABI = JSON.parse(
    fs.readFileSync(
      "./ignition/deployments/chain-31337/artifacts/TradingCardsModule#TradingCards.json",
      "utf8"
    )
  ).abi;
  const contractAddress = JSON.parse(
    fs.readFileSync(
      "./ignition/deployments/chain-31337/deployed_addresses.json",
      "utf8"
    )
  )?.["TradingCardsModule#TradingCards"];

  fs.writeFileSync(
    "../backend/contract-config.json",
    JSON.stringify({ contractABI, contractAddress }, null, 2)
  );
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
