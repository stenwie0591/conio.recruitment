import React, { Component } from 'react';
import './App.css';

export default class MuseumImgBanner extends Component {

  state = {
    currentValue: '',
    error: '',
    curTime:'',
  }


  componentDidMount() {
    this.getRenderValue();
    setInterval(() => {
      window.location.reload();
    }, 900000);
  }

  getRenderValue = () => {
    fetch("https://blockchain.info/it/ticker")
    .then(response => response.json())
    .then(data => {
        // you can access your data here
        this.setState({
          currentValue: data.EUR.last,
          curTime : new Date().toLocaleString()
        })    
        console.log(data)
      })
      .catch((err) => {
        this.setState({
          error: 'Unable to load Price', err,
        })  
        console.log('Unable to load Price', err);
      });
  };
  

  render() {
    const {error, currentValue, curTime} = this.state;
    const realValue = (error === '') ? currentValue : error;
    return (
      <div className="App">
          <h1>
            Bitcoin price
          </h1>
          {`${realValue} €`}
          <p>
          {`Last update: ${curTime}`}
          </p>
      </div>
    )
  }
}
