

export function testi() {
    return "testi";
}

// contract.on("PackPurchased", async (buyer, packId, amountPaid) => {
//   // 1) Hae paketin sisältö cards-taulusta
//   const pack = await packsRepository.findOne({ where: { id: packId }, relations: ['cards'] });

//   // 2) Arvo kortit satunnaisesti paketin configJson:in perusteella
//   const selectedCards = rollCards(pack.cards, pack.configJson);

//   // 3) Minttaa kortit käyttäjälle
//   for (const card of selectedCards) {
//     const tokenId = await mintCardOnChain(buyer, card); // ERC-1155 mint-funktio
//     await mintedCardsRepository.save({
//       tokenId,
//       ownerWallet: buyer,
//       mintedAt: new Date(),
//       card: card
//     });
//   }
// });


// contract 
// function mintCard(address to, uint256 id, uint256 amount) external onlyOwner {
//     _mint(to, id, amount, "");
// }


/// MINT PATCH

// async function mintPatchForUser(buyer: string, cards: Card[]) {
//     const tokenIds = cards.map(c => c.tokenId);
//     const amounts = Array(cards.length).fill(1); // yksi kutakin korttia

//     await contract.mintPatch(buyer, tokenIds, amounts);

//     // Tallenna kaikki minted_cards tietokantaan
//     for (const card of cards) {
//         await mintedCardsRepository.save({
//             tokenId: card.tokenId,
//             ownerWallet: buyer,
//             mintedAt: new Date(),
//             card: card
//         });
//     }
// }

// contract
// function mintPatch(address to, uint256[] memory tokenIds, uint256[] memory amounts) external onlyOwner {
//     require(tokenIds.length == amounts.length, "Arrays length mismatch");

//     for (uint256 i = 0; i < tokenIds.length; i++) {
//         _mint(to, tokenIds[i], amounts[i], "");
//     }
// }