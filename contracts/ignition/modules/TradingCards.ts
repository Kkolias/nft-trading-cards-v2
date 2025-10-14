import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TradingCardsModule", (m) => {
  // Parametrit voi lukea prosessista
  const baseUri = m.getParameter("baseUri", "https://your-api/cards/");
  const treasury = m.getParameter(
    "treasury",
    "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e" // lompakko address johon rahat menee
  );

  //   const tradingCards = m.contract("TradingCards", []);
  const tradingCards: any = m.contract("TradingCards", [baseUri, treasury]);

  // show deployed contract address
   

  return { tradingCards };
});
