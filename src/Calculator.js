import React from 'react';
import './Calculator.css';
import Display from './Display';
import ButtonGrid from './ButtonGrid';

class Calculator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: "123456789.1234",
    }
  }

  render() {
    return (
      <div className="Calculator">
        <Display value={this.state.value}/>
        <ButtonGrid/>
      </div>
    )
  }
}

export default Calculator;
