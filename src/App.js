import React, {useState} from 'react'
import './App.css';
import Timer from './Timer'

function App() {
  const [duration, setDuration] = useState(0)

  const handleNumChange = (e) => {
    setDuration(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
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