import { useState } from 'react';

export default function Newtab() {
  const [number, setNumber] = useState(0);
  return (
    <div className="App">
      <div className="card">{number}</div>
      <button type="button" onClick={() => setNumber((prev) => prev + 1)}>
        Increment
      </button>
      <div className="h-96 bg-red-400 h-px-2">l</div>
      <h1 className="text-5xl">Hello world</h1>
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
