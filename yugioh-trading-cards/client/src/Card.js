import React, { Component } from "react";

import './Card.css';

export class Card extends Component {

  constructor(props) {
      super(props);
  }

  render(){
    return (
      <div className="Card col-xs-12 col-sm-6 col-md4 col-lg-3">
          <h3 className="display-5">{this.props.info.name}</h3>
          <img src={this.props.info.picture} className="card-picture" />
          <p className="owner">owner: {this.props.info.owner}</p>
          <p className="price">price: Ether {this.props.info.price}</p>

          {  this.props.renderButton === "buy" &&
            <button className="btn btn-primary"
                    name={this.props.info.id}
                    value={this.props.info.price}
                    onClick={(event) => {
                      this.props.purchaseCard(event.target.name, event.target.value)
                    }} >Buy </button>
          }
          
          {  this.props.renderButton === "sell" && 
            <button 
              className="btn btn-primary"
              name={this.props.info.id}
              value={this.props.info.id}
              onClick={(event) => {
                this.props.enableCardForSale(event.target.value)
              }} >Sell</button>
          }

          {  this.props.renderButton === "cancel-sale" &&
            <button className="btn btn-primary" 
              value={this.props.info.id}
              onClick={(event) => {
                this.props.disableCardForSale(event.target.value)
              }}>Remove from sale </button>
          }
      </div>
    );
  }

}

