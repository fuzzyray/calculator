import React from 'react';
import './Display.css';

function Display(props) {
  return (
    <div className="Display" id="display">
      <p>{props.value}</p>
    </div>
  );
}

export default Display;