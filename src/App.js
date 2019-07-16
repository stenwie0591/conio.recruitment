import React, { Component } from 'react';
import './App.css';
import Spinner from './Spinner';
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
  }

  componentWillUpdate() {
    setInterval(() => {
      this.getRenderValue();
    }, 900000); 
  }

  getRenderValue = () => {
    setTimeout(() => {
      fetch("https://blockchain.info/it/ticker")
      .then(response => response.json())
      .then(data => {
          this.setState({
            currentValue: data.EUR.last,
            curTime : new Date().toLocaleString(),
            loader: false,
          })
          localStorage.setItem('currentValue', this.state.currentValue)
        })
        .catch((err) => {
          this.setState({
            error: 'Unable to load Price', err,
          })  
        });  
    }, 1000);
  };
  

  render() {
    const {error, currentValue, curTime, loader} = this.state;

    const realValue = error || currentValue;
    const prevValue = localStorage.getItem('currentValue') || realValue;
    const lastUpdate = !error ? curTime : '-';
    const loading = loader && <Spinner />;
    const percentage = ([(realValue - prevValue) / prevValue ] * 100).toFixed(4);

    return (
      <Wrapper>
        <h1>
          Bitcoin price
        </h1>
        <h2>
          {`${realValue} €`}
        </h2>
        <h5>
          {loader ? loading : `${percentage}% since last visit`}
        </h5>
        <hr></hr>
        <h6>
          {`Last update: ${lastUpdate}`}
        </h6>
      </Wrapper>
    )
  }
}
