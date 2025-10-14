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

    event PackPurchased(
        address indexed buyer,
        uint256 indexed packId,
        uint256 amountPaid
    );

    constructor(string memory baseUri, address _treasury) ERC1155(baseUri) Ownable(msg.sender) {
        treasury = _treasury;
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

    function setTreasury(address newTreasury) external onlyOwner {
        treasury = newTreasury;
    }

    /// apissa luodun packin on-chain alustus
    function initNewPack(uint256 packId, uint256 packPriceWei) external onlyOwner {
        require(packPrice[packId] == 0, 'Pack already initialized');
        require(packPriceWei > 0, 'Invalid new pack price');
        packPrice[packId] = packPriceWei;
    }
}
