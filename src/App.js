import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class MuseumImgBanner extends Component {

  componentDidMount() {
        fetch("https://blockchain.info/it/ticker")
        .then(response => response.json())
        .then(data => {
            // you can access your data here
            console.log(data)
          })
          .catch((err) => {
            console.log('Geolocation parsing failed', err);
          });
      }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}
