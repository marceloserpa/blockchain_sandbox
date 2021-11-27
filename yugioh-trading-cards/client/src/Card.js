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
  
          { this.props.info.forSale && 
            <button className="btn btn-primary">Buy #ID {this.props.info.id}</button>
          }
          
          { !this.props.info.forSale && 
            <button className="btn btn-primary">Sell #ID {this.props.info.id}</button>
          }
      </div>
    );
  }

}

