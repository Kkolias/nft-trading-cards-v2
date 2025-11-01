// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TradingCards is ERC1155, Ownable {
    using Strings for uint256;

    /// osoite johon maksut ohjataan
    address public treasury;

    /// pakettien hinnat (packId -> hinta wei:ssä)
    mapping(uint256 => uint256) public packPrice;

    /// tokeneiden metadata base URI (esim. "https://api.example.com/cards/{id}.json")
    string private baseMetadataUri;

    /// tokeneiden supply seuranta (tokenId -> minted amount)
    mapping(uint256 => uint256) public totalSupply;

    event PackPurchased(
        address indexed buyer,
        uint256 indexed packId,
        uint256 amountPaid
    );

    event CardMinted(
        address indexed to,
        uint256 indexed tokenId,
        uint256 amount
    );

    constructor(
        string memory baseUri,
        address _treasury
    ) ERC1155(baseUri) Ownable(msg.sender) {
        treasury = _treasury;
        baseMetadataUri = baseUri;
    }

    /// admin asettaa hinnan paketille
    function setPackPrice(uint256 packId, uint256 priceWei) external onlyOwner {
        packPrice[packId] = priceWei;
    }

    /// käyttäjä ostaa paketin ja maksaa treasuryyn
    function payPack(uint256 packId) external payable {
        uint256 price = packPrice[packId];
        require(price > 0, "Pack not configured");
        require(msg.value == price, "Incorrect ETH amount");

        // siirrä rahat treasuryyn heti
        (bool sent, ) = treasury.call{value: msg.value}("");
        require(sent, "Payment transfer failed");

        emit PackPurchased(msg.sender, packId, msg.value);
        // Tässä EI mintata kortteja → backend kuuntelee eventin ja minttaa erikseen
    }

    /// minttaa uuden kortin backendin kutsusta
    function mintCard(
        address to,
        uint256 tokenId,
        uint256 amount
    ) external onlyOwner {
        require(amount > 0, "Invalid mint amount");
        require(to != address(0), "Invalid recipient address"); /// estää minttauksen noll-osoitteeseen

        _mint(to, tokenId, amount, "");
        totalSupply[tokenId] += amount;

        emit CardMinted(to, tokenId, amount);
    }

    /// tarkasta tokenin supply
    function getTotalSupply(uint256 tokenId) external view returns (uint256) {
        return totalSupply[tokenId];
    }

    /// tarkasta käyttäjän tokenit
    function getUserTokens(
        address user,
        uint256[] memory tokenIds
    ) external view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            balances[i] = balanceOf(user, tokenIds[i]);
        }
        return balances;
    }

    /// aseta uusi base URI metadatalle
    function setBaseUri(string memory newBaseUri) external onlyOwner {
        baseMetadataUri = newBaseUri;
    }

    function setTreasury(address newTreasury) external onlyOwner {
        treasury = newTreasury;
    }

    /// apissa luodun packin on-chain alustus
    function initNewPack(
        uint256 packId,
        uint256 packPriceWei
    ) external onlyOwner {
        require(packPrice[packId] == 0, "Pack already initialized");
        require(packPriceWei > 0, "Invalid new pack price");
        packPrice[packId] = packPriceWei;
    }
}
