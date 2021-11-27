import React, { Component } from "react";

import './Card.css';

function Card(props) {

  return (
    <div className="Card col-xs-12 col-sm-6 col-md4 col-lg-3">
        <h3 className="display-5">{props.info.name}</h3>
        <img src={props.info.picture} className="card-picture" />
        <p className="owner">owner: {props.info.owner}</p>
        <p className="price">price: Ether {props.info.price}</p>

        { props.info.forSale && 
          <button className="btn btn-primary">Buy #ID {props.info.id}</button>
        }
        
        { !props.info.forSale && 
          <button className="btn btn-primary">Sell #ID {props.info.id}</button>
        }
    </div>
  );
}

export default Card;
