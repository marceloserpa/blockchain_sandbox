import React, { Component } from "react";
import { Card } from './Card.js';


export class MyCards extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const userAccount = this.props.userAccount;
        const cards = this.props.cards.filter(card => userAccount === card.owner)
              .map(card => {
                    console.log(card    )
                return <Card info={card} 
                enableCardForSale={this.props.enableCardForSale} 
                renderButton={card.forSale ? "cancel-sale" : "sell"}
                key={card.id} />
              });
      
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

}
