import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    // This is where I initiate state
    this.state = {
      digit: '0',
      secondary: '',
      waiting: false,
      operator: ''
    }

    // This is where I bind my functions
    this.inputDigit = this.inputDigit.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.inputDecimal = this.inputDecimal.bind(this);
    this.neg = this.neg.bind(this);
    this.percent = this.percent.bind(this);
    this.operate = this.operate.bind(this);
    this.enter = this.enter.bind(this);
  }

  // InputDigit function accepts a value, this is what is fired when a button is clicked
  inputDigit(val) {

    // if statement checks to see if waiting is true, meaning that a function button has
    // been pressed, and that secondary state is empty
    // if this is true, move the display numbers (digit) to secondary, and then add
    // second part of equation to digit state
    if (this.state.waiting && !this.state.secondary) {
      this.setState({
        secondary: this.state.digit,
        digit: val,
        waiting: false
      })
    // else set the digit state to number being pressed, if digit is zero, change it to
    // the new number, if not zero, add new numbers to end of current digits
    } else {
      this.setState({
        digit: this.state.digit === '0' ? val : this.state.digit + val
      })
    }
  }

  // function is called when AC is pressed, clears the display and resets state to
  // what is set during initiation
  clearDisplay() {
    this.setState({
      digit: '0',
      secondary: '',
      waiting: false,
      operator: ''
    })
  }

  // inputDecimal allows a decimal to be added
  inputDecimal() {
    const num = this.state.digit

    // if waiting is true and decimal is clicked, change digit to 0.
    if (this.state.waiting) {
      this.setState({
        secondary: this.state.digit,
        digit: '0.',
        waiting: false
      })
    } else {
      // else, if there is no decimal already included, take the current number
      // and add a decimal after
      if (!num.includes('.')) {
        this.setState({
          digit: num + '.'
        })
      }
    }

  }

  // +/- sign
  // make things negative or positive
  // if - is the first character, then get rid of -, if - isn't there, add it
  neg() {
    this.setState({
      digit: this.state.digit.charAt(0) === '-' ? this.state.digit.substr(1) : '-' + this.state.digit
    })
  }

  // for percentage, turn the string into a number and then divide by 100
  // turn it back into a string
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

  // enter is what is called when = is pressed or when an operator is pressed twice
  enter() {
    const first = parseFloat(this.state.secondary)
    const second = parseFloat(this.state.digit)
    const operator = this.state.operator

    // if the operater state is set, move on
    if (!!operator) {
      // if operator is add, add first to second and return to string, clear out other state
      if (operator === 'add') {
        this.setState({
          digit: String(first + second),
          operator: '',
          secondary: ''
        })
      // subtract second number from first, set digit state and reset other state
      } else if (operator === 'sub') {
        this.setState({
          digit: String(first - second),
          operator: '',
          secondary: ''
        })
      // multiply first times second number, set digit state and reset other state
      } else if (operator === 'mult') {
        this.setState({
          digit: String(first * second),
          operator: '',
          secondary: ''
        })
      // divide first by second, set digit state and reset other state
      } else if (operator === 'div')
      this.setState({
        digit: String(first / second),
        operator: '',
        secondary: ''
      })
    }

  }

  // this is where the actual calculator html is located
  // i used divs with onClick operators to call the functions
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
            <div className="button classic" onClick={this.inputDecimal}>.</div>
            <div className="button right" onClick={this.enter}>=</div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
