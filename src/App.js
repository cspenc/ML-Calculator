import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      digit: '0'
    }

  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <div className="display">0</div>
          <div className="buttons">
            <div className="button top">AC</div>
            <div className="button top">+/-</div>
            <div className="button top">%</div>
            <div className="button right">div</div>

            <div className="button classic">7</div>
            <div className="button classic">8</div>
            <div className="button classic">9</div>
            <div className="button right">X</div>

            <div className="button classic">4</div>
            <div className="button classic">5</div>
            <div className="button classic">6</div>
            <div className="button right">-</div>

            <div className="button classic">1</div>
            <div className="button classic">2</div>
            <div className="button classic">3</div>
            <div className="button right">+</div>

            <div className="button classic zero">0</div>
            <div className="button classic">.</div>
            <div className="button right">=</div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
