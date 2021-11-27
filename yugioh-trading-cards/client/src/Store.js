import React, { Component } from "react";
import Card from './Card.js';

function Store(props) {
  return (
    <article>
        {renderCardList(props.userAccount, props.cards)}
    </article>
  );
}


function renderCardList(account, cards){

    const list = cards.filter(card => {
        return account !== card.owner;
    }).map(card => {
        return <Card info={card} key={card.id} />
    });

    return (
        <div className = "container">
        <div className="row">
            {list}
        </div>
        </div>
    );

}

export default Store;
