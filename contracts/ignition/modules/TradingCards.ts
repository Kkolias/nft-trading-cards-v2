import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const treasuryOwnerWallet = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";

export default buildModule("TradingCardsModule", (m) => {
  // Parametrit voi lukea prosessista
  const baseUri = m.getParameter("baseUri", "https://your-api/cards/");
  const treasury = m.getParameter(
    "treasury",
    treasuryOwnerWallet // esimerkki lompakko address johon rahat menee
  );

  const tradingCards: any = m.contract("TradingCards", [baseUri, treasury]);

  const newOwner = treasuryOwnerWallet;
  m.call(tradingCards, "transferOwnership", [newOwner]);

  return { tradingCards };
});
