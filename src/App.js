import React from 'react';
import './App.css';
import Calculator from './Calculator';

function App() {
  return (
    <div className="App">
      <div className="unsupported">
        <p>Javascript Calculator</p>
        <p>Minimum screen width of 360px required</p>
      </div>
      <Calculator/>
    </div>
  );
}

export default App;
