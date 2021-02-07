import { useState, useEffect } from 'react';
import { formatTime } from './timeUtils';

// useTimer has an input of duration, an integer value that represents
// the duration for the current timer
function useTimer(duration) {
  const [time, setTime] = useState(0);
  const [isPaused, setPause] = useState(true);

  const reset = () => {
    setPause(true);
    setTime(0);
  };
  const togglePause = () => setPause(!isPaused);

  useEffect(() => {
    if (time === duration * 60 || duration === 0 || isPaused) {
      return;
    }
    let interval = setInterval(() => {
      setTime(time + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [time, duration, isPaused]);
  return {
    time,
    formattedTime: formatTime(duration * 60 - time),
    reset,
    togglePause,
    isPaused,
  };
}

export default useTimer;
