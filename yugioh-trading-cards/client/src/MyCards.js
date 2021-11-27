import React, { Component } from "react";
import Card from './Card.js';

function MyCards(props) {
  return (
    <article>
        {renderCardList(props.cards)}
    </article>
  );
}


function renderCardList(cards){

    const list = cards.map(card => {
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

export default MyCards;
