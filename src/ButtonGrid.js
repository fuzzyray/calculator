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
      <button id="add" className={operatorBtn}>+</button>
      <button id="subtract" className={operatorBtn}>-</button>
      <button id="multiply" className={operatorBtn}>&#xd7;</button>
      <button id="divide" className={operatorBtn}>&#xf7;</button>
      <button id="equals" className={operatorBtn}>=</button>
      <button id="clear" className={operatorBtn}>C</button>
      <button id="zero" className={numberBtn}>0</button>
      <button id="one" className={numberBtn}>1</button>
      <button id="two" className={numberBtn}>2</button>
      <button id="three" className={numberBtn}>3</button>
      <button id="four" className={numberBtn}>4</button>
      <button id="five" className={numberBtn}>5</button>
      <button id="six" className={numberBtn}>6</button>
      <button id="seven" className={numberBtn}>7</button>
      <button id="eight" className={numberBtn}>8</button>
      <button id="nine" className={numberBtn}>9</button>
      <button id="decimal" className={numberBtn}>.</button>
    </div>
  )
}

export default ButtonGrid