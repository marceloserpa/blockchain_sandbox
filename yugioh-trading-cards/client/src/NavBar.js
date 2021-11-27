import React, { Component } from "react";

export class NavBar extends Component {

  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"> <img src="/yugioh_logo_full.png" alt="" width="150" height="55" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/home">Home</a>
              <a className="nav-link" href="/mycards">My Cards</a>
              <a className="nav-link" href="/store">Store</a>
            </div>
          </div>
        </div>
      </nav>
    )
  }

}
