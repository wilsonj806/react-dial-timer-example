import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import Timer from './Timer'

function App() {
  const [isToggled, setToggleState] = useState(false)
  const [duration, setDuration] = useState(0)

  const handleChange = (e) => {
    setToggleState(!isToggled)
  }
  const handleNumChange = (e) => {
    setDuration(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Timer duration={duration}/>
        <label>
          Set duration in minutes
          <input type='number' value={duration} onChange={handleNumChange}/>
        </label>
      </header>
    </div>
  );
}

export default App;