import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      digit: '0'
    }

    this.inputDigit = this.inputDigit.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.inputDot = this.inputDot.bind(this);
    this.neg = this.neg.bind(this);
    this.percent = this.percent.bind(this);

  }

  inputDigit(val) {
    this.setState({
      digit: this.state.digit === '0' ? val : this.state.digit + val
    })
  }

  clearDisplay() {
    this.setState({
      digit: '0'
    })
  }

  inputDot() {
    const num = this.state.digit
    if (!num.includes('.')) {
      this.setState({
        digit: num + '.'
      })
    }
  }

  neg() {
    this.setState({
      digit: this.state.digit.charAt(0) === '-' ? this.state.digit.substr(1) : '-' + this.state.digit
    })
  }

  percent() {
    const num = parseFloat(this.state.digit)/100

    this.setState({
      digit: String(num)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <div className="display">{this.state.digit}</div>
          <div className="buttons">
            <div className="button top" onClick={this.clearDisplay}>AC</div>
            <div className="button top" onClick={this.neg}>±</div>
            <div className="button top" onClick={this.percent}>%</div>
            <div className="button right">÷</div>

            <div className="button classic" onClick={() => this.inputDigit('7')}>7</div>
            <div className="button classic" onClick={() => this.inputDigit('8')}>8</div>
            <div className="button classic" onClick={() => this.inputDigit('9')}>9</div>
            <div className="button right">×</div>

            <div className="button classic" onClick={() => this.inputDigit('4')}>4</div>
            <div className="button classic" onClick={() => this.inputDigit('5')}>5</div>
            <div className="button classic" onClick={() => this.inputDigit('6')}>6</div>
            <div className="button right">–</div>

            <div className="button classic" onClick={() => this.inputDigit('1')}>1</div>
            <div className="button classic" onClick={() => this.inputDigit('2')}>2</div>
            <div className="button classic" onClick={() => this.inputDigit('3')}>3</div>
            <div className="button right">+</div>

            <div className="button classic zero" onClick={() => this.inputDigit('0')}>0</div>
            <div className="button classic" onClick={this.inputDot}>.</div>
            <div className="button right">=</div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
