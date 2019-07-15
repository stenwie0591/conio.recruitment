import React, { Component } from 'react';
import './App.css';
import Wrapper from './Wrapper';

export default class App extends Component {

  state = {
    currentValue: '0,00',
    error: '',
    curTime:'',
    loader: true,
  }


  componentDidMount() {
    this.getRenderValue();
    setInterval(() => {
      window.location.reload();
    }, 900000); 
  }

  getRenderValue = () => {
    setTimeout(() => {
      fetch("https://blockchain.info/it/ticker")
      .then(response => response.json())
      .then(data => {
          // you can access your data here
          this.setState({
            currentValue: data.EUR.last,
            curTime : new Date().toLocaleString(),
            loader: false,
          })
          localStorage.setItem('currentValue', this.state.currentValue)
          console.log(data)
        })
        .catch((err) => {
          this.setState({
            error: 'Unable to load Price', err,
          })  
          console.log('Unable to load Price', err);
        });  
    }, 1000);
  };
  

  render() {
    const {error, currentValue, curTime, loader} = this.state;
    const realValue = (error === '') ? currentValue : error;
    const prevValue = localStorage.getItem('currentValue')
    const lastUpdate = (error === '') ? curTime : '-';
    const loading = (loader === true) ? <Wrapper /> : null;
    return (
      <div className="App">
          <h1>
            Bitcoin price
          </h1>
          {`${realValue} €`}
          {loading}
          <p>
          {loader === false ? `Difference respect previous value: ${[(realValue - prevValue) / prevValue ] * 100} %` : null}
          </p>
          <p>
          {`Last update: ${lastUpdate}`}
          </p>
      </div>
    )
  }
}
