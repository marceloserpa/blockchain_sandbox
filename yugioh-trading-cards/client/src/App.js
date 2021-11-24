import React, { Component } from "react";
import web3 from './getWeb3';

import './App.css';
import './Card.js';
import './NavBar.js'

import Card from './Card.js';
import NavBar from './NavBar.js';

class App extends Component {


  async componentWillMount() {
    console.log('hellloooo')
  }

  renderCardList(cards){

    const list = cards.map(card => {
      return <Card info={card} />
    });


    return (
      <div class = "container">
        <div class="row">
          {list}
        </div>
      </div>
    );

  }

  render(){

    const cards = [
      {id: 1, name: 'Dark Armed Dragon SDDC-EN012', picture: '/images/22078.jpg', price: 0.0008293487778357997},
      {id: 2, name: 'Blue-Eyes White Dragon', picture: '/images/2184.jpg', price: 0.0016628651374697694},
      {id: 3, name: 'Trishula, Dragon of the Ice Barrier BLVO-EN100', picture: '/images/61532.jpg', price: 0.18712400597964635},
      {id: 4, name: 'Black Luster Soldier - Soldier of Chaos', picture: '/images/53863.jpg', price: 0.08337185827213461},
      {id: 5, name: 'Level Up! SS05-ENB22', picture: '/images/61036.jpg', price: 0.04168386143145479},
      {id: 6, name: 'Nightmare Wheel SS05-ENB27', picture: '/images/61042.jpg', price: 0.04168386143145479},
      {id: 7, name: 'Helpoemer SS05-ENB13', picture: '/images/61018.jpg', price: 0.04168386143145479},
      {id: 8, name: 'Number 107: Galaxy-Eyes Tachyon Dragon', picture: '/images/59712.jpg', price: 0.00037474166168539544},
      {id: 9, name: 'Legendary Six Samurai - Shi En RYMP-ENSE1', picture: '/images/23827.jpg', price: 0.0015419014533640464},
      {id: 10, name: 'Hieratic Sun Dragon Overlord of Heliopolis', picture: '/images/25130.jpg', price: 0.0010416901140731958},
      {id: 11, name: 'Cyber Twin Dragon LED3-EN018', picture: '/images/50502.jpg', price: 0.00007669907202459707},
      {id: 12, name: 'Elemental HERO Flame Wingman RYMP-EN016', picture: '/images/22158.jpg', price: 0.002871870796658626},
    ];

    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <body>
          {this.renderCardList(cards)}
        </body>
      </div>
      
    );
  }




}

export default App;
