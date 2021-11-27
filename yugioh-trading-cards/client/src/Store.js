import React, { Component } from "react";
import { Card } from './Card.js';



export class Store extends Component {

    constructor(props) {
        super(props);
    }


    render(){
        const account = this.props.userAccount;
        const cards = this.props.cards;
      
        const list = cards.filter(card => {
              return account !== card.owner && card.forSale;
          }).map(card => {
              return <Card info={card} key={card.id} renderButton={"buy"} />
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

}

