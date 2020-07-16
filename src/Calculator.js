import React from 'react'
import './Calculator.css'
import Display from './Display'
import ButtonGrid from './ButtonGrid'

const doCalc = (first, second, op) => {
  // TODO: Need to fix for precision
  // Handle case where started a negative number
  if (first === '-' && second === '-') {
    return '0'
  } else if (first === '-') {
    return second
  } else if (second === '-') {
    return first
  }
  const firstNum = parseFloat(first)
  const secondNum = parseFloat(second)
  let result
  switch (op) {
    case '*':
      result = firstNum * secondNum
      break
    case '/':
      result = firstNum / secondNum
      break
    case '+':
      result = firstNum + secondNum
      break
    case '-':
      result = firstNum - secondNum
      break
    default:
      return undefined
  }
  return result.toString()
}

/*
Finite State Machine taken and modified from:
https://medium.com/@rvunabandi/making-a-calculator-in-javascript-64193ea6a492
Code was not used or looked at, only the state machine description was used.

FSM States:
1. initial
2. firstInput
3. operator
4. secondaryInput
5. trailingOperator
6. trailingInput
7. equality
*/

const INITIALSTATE = {
  state: 'initial',
  first: '0',
  op1: '+',
  second: '0',
  op2: '+',
  trailing: '0',
  display: 'first',
  errorMsg: '',
}

const digitRegex = /[0-9.]/
const operatorRegex = /[*/+-]/
const simpleOpRegex = /[+-]/
const complexOpRegex = /[*/]/

const updateDigitInput = (value, digit) => {
  let newValue
  if (/\./.test(value) && digit === '.') {
    newValue = value
  } else if (value === '0' && digit === '0') {
    newValue = '0'
  } else if (value === '0' && digit === '.') {
    newValue = '0.'
  } else if (value === '0') {
    newValue = digit
  } else {
    newValue = value + digit
  }
  return newValue
}

class Calculator extends React.Component {

  constructor (props) {
    super(props)
    this.state = INITIALSTATE
  }

  componentDidMount () {
    window.addEventListener('keyup', this.handleKeyUp)
    // console.log('state:', this.state)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  handleKeyUp = (e) => {
    let value = e.key.toUpperCase()
    if (value === 'ENTER') {
      value = '='
    }
    if (/[C0-9.=/*+-]/.test(value)) {
      this.handleInput(value)
    }
  }

  handleClick = (value) => {
    this.handleInput(value)
  }

  handleInput = (keyValue) => {
    // Clear button pressed, reset to initial state
    if (keyValue === 'C') {
      this.setState(INITIALSTATE)
      //console.clear()
      return
    }
    switch (this.state.state) {
      case 'initial':
        this.initialState(keyValue)
        break
      case 'firstInput':
        this.firstInputState(keyValue)
        break
      case 'operator':
        this.operatorState(keyValue)
        break
      case 'secondaryInput':
        this.secondaryInputState(keyValue)
        break
      case 'trailing':
        this.trailingState(keyValue)
        break
      case 'trailingInput':
        this.trailingInputState(keyValue)
        break
      case 'equality':
        this.equalityState(keyValue)
        break
      case 'error':
        this.errorState()
        break
      default:
        break
    }
  }

  initialState = (input) => {
    this.setState({ state: 'initial' })
    if (digitRegex.test(input)) {
      this.setState({
        state: 'firstInput',
        first: updateDigitInput(this.state.first, input),
        display: 'first',
      })
    } else if (operatorRegex.test(input)) {
      this.setState({
        state: 'operator',
        op1: input,
      })
    } else if (input === '=') {
      this.setState({ state: 'equality' })
    } else {
      console.error('initialState: Bad Input', input)
      this.setState({
        state: 'error',
        errorMsg: 'unexpected input',
        display: 'errorMsg',
      })
    }
  }

  firstInputState = (input) => {
    if (digitRegex.test(input)) {
      let firstNum = updateDigitInput(this.state.first, input)
      if (firstNum.length < 15) {
        this.setState({
          first: firstNum,
        })
      } else {
        this.setState({
          state: 'error',
          first: firstNum,
          display: 'errorMsg',
          errorMsg: 'Digits Exceeded',
        })
      }
    } else if (operatorRegex.test(input)) {
      this.setState({
        state: 'operator',
        op1: input,
        second: this.state.first,
        display: 'first',
      })
    } else if (input === '=') {
      const result = doCalc(this.state.first, this.state.second,
        this.state.op1)
      this.setState({
        state: 'equality',
        first: result,
        display: 'first',
      })
    } else {
      console.error('firstInputState: Bad Input', input)
      this.setState({
        state: 'error',
        display: 'errorMsg',
        errorMsg: 'Unexpected Input',
      })
    }
  }

  operatorState = (input) => {
    if (digitRegex.test(input) || input === '-') {
      this.setState({
        state: 'secondaryInput',
        second: updateDigitInput('0', input),
        display: 'second',
      })
    } else if (operatorRegex.test(input)) {
      this.setState({
        state: 'operator',
        op1: input,
        second: this.state.first,
        display: 'first',
      })
    } else if (input === '=') {
      const result = doCalc(this.state.first, this.state.second,
        this.state.op1)
      this.setState({
        state: 'equality',
        first: result,
        display: 'first',
      })
    } else {
      console.error('operatorState: Bad Input', input)
      this.setState({
        state: 'error',
        display: 'errorMsg',
        errorMsg: 'Unexpected Input',
      })
    }
  }

  secondaryInputState = (input) => {
    if (digitRegex.test(input)) {
      let secondNum = updateDigitInput(this.state.second, input)
      if (secondNum.length < 15) {
        this.setState({
          second: secondNum,
        })
      } else {
        this.setState({
          state: 'error',
          second: secondNum,
          display: 'errorMsg',
          errorMsg: 'Digits Exceeded',
        })
      }
    } else if (operatorRegex.test(input)) {
      if (complexOpRegex.test(input) && simpleOpRegex.test(this.state.op1)) {
        this.setState({
          state: 'trailing',
          op2: input,
          trailing: this.state.second,
          display: 'second',
        })
      } else {
        const result = doCalc(this.state.first, this.state.second,
          this.state.op1)
        this.setState({
          state: 'operator',
          first: result,
          second: result,
          op1: input,
        })
      }
    } else if (input === '=') {
      const result = doCalc(this.state.first, this.state.second, this.state.op1)
      this.setState({
        state: 'equality',
        first: result,
        display: 'first',
      })
    } else {
      console.error('secondaryInputState: Bad Input', input)
      this.setState({
        state: 'error',
        display: 'errorMsg',
        errorMsg: 'Unexpected Input',
      })
    }
  }

  trailingState = (input) => {
    if (digitRegex.test(input) || input === '-') {
      this.setState({
        state: 'trailingInput',
        trailing: updateDigitInput('0', input),
        display: 'trailing',
      })
    } else if (input === '=') {
      const result2 = doCalc(this.state.second, this.state.trailing,
        this.state.op2)
      const result1 = doCalc(this.state.first, result2, this.state.op1)
      this.setState({
        state: 'equality',
        first: result1,
        second: result2,
        display: 'first',
      })
    } else if (operatorRegex.test(input)) {
      if (complexOpRegex.test(input)) {
        this.setState({
          op2: input,
        })
      } else {
        const result2 = doCalc(this.state.second, this.state.trailing,
          this.state.op2)
        const result1 = doCalc(this.state.first, result2, this.state.op1)
        this.setState({
          state: 'operator',
          first: result1,
          second: result2,
          op1: input,
          display: 'first',
        })
      }
    } else {
      console.error('trailingState: Bad Input', input)
      this.setState({
        state: 'error',
        display: 'errorMsg',
        errorMsg: 'Unexpected Input',
      })
    }
  }

  trailingInputState = (input) => {
    if (digitRegex.test(input)) {
      let trailingNum = updateDigitInput(this.state.trailing, input)
      if (trailingNum.length < 15) {
        this.setState({
          trailing: trailingNum,
        })
      } else {
        this.setState({
          state: 'error',
          second: trailingNum,
          display: 'errorMsg',
          errorMsg: 'Digits Exceeded',
        })
      }
    } else if (input === '=') {
      const result2 = doCalc(this.state.second, this.state.trailing,
        this.state.op2)
      const result1 = doCalc(this.state.first, result2, this.state.op1)
      this.setState({
        state: 'equality',
        first: result1,
        second: result2,
        display: 'first',
      })
    } else if (complexOpRegex.test(input)) {
      const result = doCalc(this.state.second, this.state.trailing,
        this.state.op2)
      this.setState({
        state: 'trailing',
        second: result,
        trailing: result,
        op2: input,
        display: 'second',
      })
    } else if (simpleOpRegex.test(input)) {
      const result2 = doCalc(this.state.second, this.state.trailing,
        this.state.op2)
      const result1 = doCalc(this.state.first, result2, this.state.op1)
      this.setState({
        state: 'operator',
        first: result1,
        second: result2,
        op1: input,
        display: 'first',
      })
    } else {
      console.error('trailingInputState: Bad Input', input)
      this.setState({
        state: 'error',
        display: 'errorMsg',
        errorMsg: 'Unexpected Input',
      })
    }
  }

  equalityState = (input) => {
    if (input === '=') {
      const result = doCalc(this.state.first, this.state.second, this.state.op1)
      this.setState({
        first: result,
      })
    } else if (operatorRegex.test(input)) {
      this.setState({
        state: 'operator',
        second: this.state.first,
        op1: input,
      })
    } else if (digitRegex.test(input)) {
      this.setState({
        state: 'firstInput',
        first: updateDigitInput('0', input),
        second: '0',
        display: 'first',
      })
    } else {
      console.error('equalityState: Bad Input', input)
      this.setState({
        state: 'error',
        display: 'errorMsg',
        errorMsg: 'Unexpected Input',
      })
    }
  }

  errorState = () => {
    console.error(this.state)
  }

  /*
  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('State:', this.state)
  }
  */

  render () {
    return (
      <div className="Calculator">
        <Display value={this.state[this.state.display]}/>
        <ButtonGrid onClick={this.handleClick}/>
      </div>
    )
  }
}

export default Calculator