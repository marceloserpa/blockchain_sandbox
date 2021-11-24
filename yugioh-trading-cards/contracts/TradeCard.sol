// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract TradeCard {

    string public name;

    uint public cardCount = 0;
    mapping(uint => Card) public cards;

    constructor() public {
        name = "Yu-Gi-Oh! Ethereum Trading-Card";
    }

    struct Card {
        uint id;
        string name;
        string picture;
        uint price;
        address payable owner;
        bool forSale;
    }

    event CardCreated(
        uint id,
        string name,
        string picture,
        uint price,
        address payable owner,
        bool purchased
    );

    function createCard(string memory _name, string memory _picture, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment card count
        cardCount ++;
        // Create the card
        cards[cardCount] = Card(cardCount, _name, _picture, _price, msg.sender, false);
        // Trigger an event
        emit CardCreated(cardCount, _name, _picture,_price, msg.sender, false);
    }


}
