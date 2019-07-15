import React, { Component } from 'react';
import './App.css';

export default class MuseumImgBanner extends Component {

  state = {
    currentValue: '',
    error: '',
  }


  componentDidMount() {
    this.getRenderValue();
  }

  getRenderValue = () => {
    fetch("https://blockchain.info/it/ticker")
    .then(response => response.json())
    .then(data => {
        // you can access your data here
        this.setState({
          currentValue: data.EUR.last,
        })    
        console.log(data)
      })
      .catch((err) => {
        this.setState({
          error: 'Bitcoin value parsing failed', err,
        })  
        console.log('Bitcoin value parsing failed', err);
      });
  };
  

  render() {
    const {error, currentValue} = this.state;
    const realValue = (error === '') ? currentValue : error;
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Bitcoin price
          </h1>
          {`${realValue}€`}
        </header>
      </div>
    )
  }
}
