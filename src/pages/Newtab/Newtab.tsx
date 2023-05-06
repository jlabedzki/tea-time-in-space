import { useState } from 'react';
import './Newtab.css';

export default function Newtab() {
  const [number, setNumber] = useState(0);
  return (
    <div className="App">
      <div>{number}</div>
      <button type="button" onClick={() => setNumber((prev) => prev + 1)}>
        Increment
      </button>
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
    </div>
  );
}
