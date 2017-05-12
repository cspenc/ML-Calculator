import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    // this is where i initiate state
    this.state = {
      digit: '0',
      secondary: '',
      waiting: false,
      operator: ''
    }

    // this is where i bind my functions
    this.inputDigit = this.inputDigit.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.inputDot = this.inputDot.bind(this);
    this.neg = this.neg.bind(this);
    this.percent = this.percent.bind(this);
    this.operate = this.operate.bind(this);
    this.enter = this.enter.bind(this);

  }

////// DOCUMENT BEFORE SENDING ///////

  inputDigit(val) {
    if (this.state.waiting && !this.state.secondary) {
      this.setState({
        secondary: this.state.digit,
        digit: val,
        waiting: false
      })
    } else {
      this.setState({
        digit: this.state.digit === '0' ? val : this.state.digit + val
      })
    }
  }

  clearDisplay() {
    this.setState({
      digit: '0',
      secondary: '',
      waiting: false,
      operator: ''
    })

  }

  inputDot() {
    const num = this.state.digit

    if (this.state.waiting) {
      this.setState({
        secondary: this.state.digit,
        digit: '0.',
        waiting: false
      })
    } else {
      if (!num.includes('.')) {
        this.setState({
          digit: num + '.'
        })
      }
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

  operate(func) {

    // if the secondary number is true and waiting is false, evaluate because this means
    // an operator button has been pressed twice
    if (!!this.state.secondary && !this.state.waiting) {
      this.enter(this.state.operator)
    }

    // when operator button is clicked, set waiting state to true so that calc will know
    // a second number is coming. also set which operator was clicked so that it can be
    // evaluated after the number is entered
    this.setState({
      waiting: true,
      operator: func
    })
  }

  enter() {
    const first = parseFloat(this.state.secondary)
    const second = parseFloat(this.state.digit)
    const operator = this.state.operator

    if (!!operator) {
      if (operator === 'add') {
        this.setState({
          digit: String(first + second),
          operator: '',
          secondary: ''
        })
      } else if (operator === 'sub') {
        this.setState({
          digit: String(first - second),
          operator: '',
          secondary: ''
        })
      } else if (operator === 'mult') {
        this.setState({
          digit: String(first * second),
          operator: '',
          secondary: ''
        })
      } else if (operator === 'div')
      this.setState({
        digit: String(first / second),
        operator: '',
        secondary: ''
      })
    }

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
            <div className="button right" onClick={() => this.operate('div')}>÷</div>

            <div className="button classic" onClick={() => this.inputDigit('7')}>7</div>
            <div className="button classic" onClick={() => this.inputDigit('8')}>8</div>
            <div className="button classic" onClick={() => this.inputDigit('9')}>9</div>
            <div className="button right" onClick={() => this.operate('mult')}>×</div>

            <div className="button classic" onClick={() => this.inputDigit('4')}>4</div>
            <div className="button classic" onClick={() => this.inputDigit('5')}>5</div>
            <div className="button classic" onClick={() => this.inputDigit('6')}>6</div>
            <div className="button right" onClick={() => this.operate('sub')}>–</div>

            <div className="button classic" onClick={() => this.inputDigit('1')}>1</div>
            <div className="button classic" onClick={() => this.inputDigit('2')}>2</div>
            <div className="button classic" onClick={() => this.inputDigit('3')}>3</div>
            <div className="button right" onClick={() => this.operate('add')}>+</div>

            <div className="button classic zero" onClick={() => this.inputDigit('0')}>0</div>
            <div className="button classic" onClick={this.inputDot}>.</div>
            <div className="button right" onClick={this.enter}>=</div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
