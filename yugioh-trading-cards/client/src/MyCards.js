import React, { Component } from "react";
import Card from './Card.js';

function MyCards(props) {

  const account = props.userAccount;

  const cards = props.cards.filter(card => account === card.owner)
        .map(card => <Card info={card} key={card.id} />);

  return (
    <article>
        <div className = "container">
            <div className="row">
                {cards}
            </div>
        </div>
    </article>
  );
}

export default MyCards;
