import React, { Component } from "react";
import Card from './Card.js';

function Store(props) {
  const account = props.userAccount;
  const cards = props.cards;

  const list = cards.filter(card => {
        return account !== card.owner;
    }).map(card => {
        return <Card info={card} key={card.id} />
    });

  return (
    <article>
        <div className = "container">
            <div className="row">
                {list}
            </div>
        </div>
    </article>
  );
}



export default Store;
