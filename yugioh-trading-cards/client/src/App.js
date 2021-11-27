import React, { Component } from "react";
import TradeCardContract from "./contracts/TradeCard.json";
import getWeb3 from './getWeb3';


import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import './Card.js';
import './NavBar.js';
import Home from './Home.js';
import MyCards from './MyCards.js';

import Card from './Card.js';
import NavBar from './NavBar.js';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      web3: null, 
      cards: [],
      account: null,
      tradeCardContract: null 
    };

  }



  componentDidMount = async () => {

    const cards = [];
    this.setState({  web3: null, cards });

    
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TradeCardContract.networks[networkId];
      const tradeCardContract = new web3.eth.Contract(
        TradeCardContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const cardCount = await tradeCardContract.methods.cardCount().call()
      this.setState({ cardCount })


      const account = accounts[0];
      this.setState({ web3, account, cards, tradeCardContract });


      console.log(this.state.account)
      console.log(this.state.cardCount)
      
      const testCards = [
        {id: 1, name: 'Dark Armed Dragon SDDC-EN012', picture: '/images/22078.jpg', price: 0.00082},
        {id: 2, name: 'Blue-Eyes White Dragon', picture: '/images/2184.jpg', price: 0.00166286},
        {id: 3, name: 'Trishula, Dragon of the Ice Barrier BLVO-EN100', picture: '/images/61532.jpg', price: 0.18712400},
        {id: 4, name: 'Black Luster Soldier - Soldier of Chaos', picture: '/images/53863.jpg', price: 0.08337185827213461},
        {id: 5, name: 'Level Up! SS05-ENB22', picture: '/images/61036.jpg', price: 0.04168386143145479},
        {id: 6, name: 'Nightmare Wheel SS05-ENB27', picture: '/images/61042.jpg', price: 0.04168386143145479},
        {id: 7, name: 'Helpoemer SS05-ENB13', picture: '/images/61018.jpg', price: 0.04168386143145479},
        {id: 8, name: 'Number 107: Galaxy-Eyes Tachyon Dragon', picture: '/images/59712.jpg', price: 0.000374741661685},
        {id: 9, name: 'Legendary Six Samurai - Shi En RYMP-ENSE1', picture: '/images/23827.jpg', price: 0.00154190145336},
        {id: 10, name: 'Hieratic Sun Dragon Overlord of Heliopolis', picture: '/images/25130.jpg', price: 0.00104169011407},
        {id: 11, name: 'Cyber Twin Dragon LED3-EN018', picture: '/images/50502.jpg', price: 0.000076699072024},
        {id: 12, name: 'Elemental HERO Flame Wingman RYMP-EN016', picture: '/images/22158.jpg', price: 0.0028718707966},
      ];

      if(testCards.length != this.state.cardCount ){
        console.log('Generate data in blockchain')
        let index = this.state.cardCount;

        for(var i=index; i < testCards.length;i++){
          let card = testCards[i];

          this.setState({ loading: true })

          const price = web3.utils.toWei(card.price.toString(), 'Ether')
          this.state.tradeCardContract.methods.createCard(card.name, card.picture, price)
            .send({ from: this.state.account })
            .once('receipt', (receipt) => {
              this.setState({ loading: false })
            });
        }

      } else {
        console.log('Load data from blockchain')
        const cards = [];  
        for (var i = 1; i <= this.state.cardCount; i++) {
          const card = await tradeCardContract.methods.cards(i).call()
          cards[i] = card; 
          cards[i].price = web3.utils.fromWei(card.price, "ether")      
        }
        this.setState({ cards })
      }


    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    
  };


  renderCardList(cards){

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

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>

        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/mycards" element={<MyCards cards={this.state.cards}/>} />
            
          </Routes>
      </BrowserRouter>
    </div>

    );
  }
}

export default App;
