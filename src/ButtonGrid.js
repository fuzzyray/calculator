import React from 'react'
import './ButtonGrid.css'

function ButtonGrid (props) {
  const numberBtn = 'pure-button button-xlarge'
  const operatorBtn = 'pure-button button-xlarge button-operator'

  return (
    <div className="ButtonGrid">
      <div id="title">
        <p>Javascript</p>
        <p>Calculator</p>
      </div>
      <button id="add"
              className={operatorBtn}
              onClick={() => props.onClick('+')}>
        +
      </button>
      <button id="subtract"
              className={operatorBtn}
              onClick={() => props.onClick('-')}>
        -
      </button>
      <button id="multiply"
              className={operatorBtn}
              onClick={() => props.onClick('*')}>
        &#xd7;
      </button>
      <button id="divide"
              className={operatorBtn}
              onClick={() => props.onClick('/')}>
        &#xf7;
      </button>
      <button id="equals"
              className={operatorBtn}
              onClick={() => props.onClick('=')}>
        =
      </button>
      <button id="clear"
              className={operatorBtn}
              onClick={() => props.onClick('C')}>
        C
      </button>
      <button id="zero"
              className={numberBtn}
              onClick={() => props.onClick('0')}>
        0
      </button>
      <button id="one"
              className={numberBtn}
              onClick={() => props.onClick('1')}>
        1
      </button>
      <button id="two"
              className={numberBtn}
              onClick={() => props.onClick('2')}>
        2
      </button>
      <button id="three"
              className={numberBtn}
              onClick={() => props.onClick('3')}>
        3
      </button>
      <button id="four"
              className={numberBtn}
              onClick={() => props.onClick('4')}>
        4
      </button>
      <button id="five"
              className={numberBtn}
              onClick={() => props.onClick('5')}>
        5
      </button>
      <button id="six"
              className={numberBtn}
              onClick={() => props.onClick('6')}>
        6
      </button>
      <button id="seven"
              className={numberBtn}
              onClick={() => props.onClick('7')}>
        7
      </button>
      <button id="eight"
              className={numberBtn}
              onClick={() => props.onClick('8')}>
        8
      </button>
      <button id="nine"
              className={numberBtn}
              onClick={() => props.onClick('9')}>
        9
      </button>
      <button id="decimal"
              className={numberBtn}
              onClick={() => props.onClick('.')}>
        .
      </button>
    </div>
  )
}

export default ButtonGrid