import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useTimer from '../utils/useTimer';

import { calculateTimeFraction } from '../utils/timeUtils';

const k = (283 * 180) / (60 * 44.85 * Math.PI);

const Timer = ({ duration }) => {
  const {
    time,
    timeLeft,
    formattedTime,
    reset,
    togglePause,
    isPaused,
  } = useTimer(duration);
  const [timeFrac, setTimeFrac] = useState(0);
  const [timeAng, setTimeAng] = useState(0);

  const rotSpeedConstant = k / duration;
  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }
    const nextTime = calculateTimeFraction(timeLeft, duration * 60);
    setTimeFrac(nextTime);
  }, [timeLeft, duration]);

  useEffect(() => {
    const angle = (time * rotSpeedConstant).toFixed(0);
    if (angle < 360) {
      setTimeAng(angle);
    } else {
      setTimeAng(360);
    }
  }, [time, timeAng, rotSpeedConstant]);

  return (
    <div>
      <TimerSvg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <Circle>
          <Elapsed cx="50" cy="50" r="45"></Elapsed>
          <Path
            strokeDasharray={`${(timeFrac * 283).toFixed(0)} 283`}
            stroke={`var(--${'green'})`}
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
          ></Path>
          <Marker
            fill="none"
            width="5"
            height="8"
            rx="2"
            x="47.5"
            y="1"
            transform={`rotate(${timeAng},0,0)`}
          />
        </Circle>
      </TimerSvg>
      <span>{formattedTime}</span>
      <button onClick={reset} type="button">
        Reset
      </button>
      <button onClick={togglePause} type="button">{`${
        isPaused ? 'Start' : 'Pause'
      }`}</button>
    </div>
  );
};

export default Timer;

const TimerSvg = styled.svg`
  --green: rgb(65, 184, 131);
  --orange: orange;
  --red: red;
  width: 300px;
  height: 300px;
  transform: scaleX(-1);
`;
const Circle = styled.g`
  fill: none;
  stroke: none;
`;

const Path = styled.path`
  stroke-width: 5px;
  stroke-linecap: butt;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  scale: -1;
`;

const Marker = styled.rect`
  transform-origin: center;
  transition: 1s linear all;
  stroke: royalblue;
`;

const Elapsed = styled.circle`
  stroke-width: 5px;
  stroke: grey;
`;
