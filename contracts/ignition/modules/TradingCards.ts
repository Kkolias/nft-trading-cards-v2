import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TradingCardsModule", (m) => {
  // Parametrit voi lukea prosessista
  const baseUri = m.getParameter("baseUri", "https://your-api/cards/");
  const treasury = m.getParameter(
    "treasury",
    "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199" // esimerkki lompakko address johon rahat menee
    // "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e" // lompakko address johon rahat menee
  );

  //   const tradingCards = m.contract("TradingCards", []);
  const tradingCards: any = m.contract("TradingCards", [baseUri, treasury]);

  // show deployed contract address
   

  return { tradingCards };
});
