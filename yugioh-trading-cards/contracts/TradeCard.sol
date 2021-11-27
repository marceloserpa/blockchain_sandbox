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
        bool forSale
    );

    function createCard(string memory _name, string memory _picture, uint _price) public {
        require(bytes(_name).length > 0);
        require(_price > 0);

        cardCount ++;
        cards[cardCount] = Card(cardCount, _name, _picture, _price, msg.sender, false);

        emit CardCreated(cardCount, _name, _picture,_price, msg.sender, false);
    }


    event CardEnableForSale(
        uint id
    );


    event CardDisabledForSale(
        uint id
    );

    function enableCardForSale(uint _id) public {
        require(_id <= cardCount);

        Card storage card = cards[_id];
        require(card.owner == msg.sender);

        card.forSale = true;
     
        emit CardEnableForSale(_id);
    }


    function removeCardForSale(uint _id) public {
        require(_id <= cardCount);

        Card storage card = cards[_id];
        require(card.owner == msg.sender);

        card.forSale = false;
     
        emit CardDisabledForSale(_id);
    }

    event CardPurchased(
        uint id
    );

    function purchaseCard(uint _id) public payable {
        require(_id <= cardCount);

        Card storage card = cards[_id];
        require(card.owner != msg.sender);

        require(card.forSale == true);
        card.forSale = false;

        (bool success, ) = card.owner.call.value(msg.value)("");
        require(success, "Transfer failed.");
        
        card.owner = msg.sender;

        emit CardPurchased(_id);
    }


}
