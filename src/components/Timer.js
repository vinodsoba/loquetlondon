import { useEffect, useState } from "react";

export default function Timer(props) {

  const [currentMillisec, setCurrentMillisec] = useState(0);
  const [currentSec, setCurrentSec] = useState(0);
  const [currentMin, setCurrentMin] = useState(0);

  useEffect(() => {
    let interval;
    if (props.time) {
      interval = setInterval(() => {
        let ms = currentMillisec + 1;
        setCurrentMillisec(ms);
        localStorage.setItem('timer', JSON.stringify({ currentMin: currentMin, currentSec: currentSec, currentMillisec: currentMillisec }))
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    setCurrentMillisec(0);
    setCurrentMin(0);
    setCurrentSec(0);
  }, [props.resetTime]);

  useEffect(() => {
    if (currentMillisec === 99) {
      let sec = currentSec + 1;
      setCurrentSec(sec);
      setCurrentMillisec(0);
    }
    localStorage.setItem('timer', JSON.stringify({ currentMin: currentMin, currentSec: currentSec, currentMillisec: currentMillisec }))
  }, [currentMillisec, currentSec]);

  useEffect(() => {
    if (currentSec === 60) {
      setCurrentSec(0);
      let min = currentMin + 1;
      setCurrentMin(min);
    }
    localStorage.setItem('timer', JSON.stringify({ currentMin: currentMin, currentSec: currentSec, currentMillisec: currentMillisec }))
  }, [currentMin, currentSec]);

  return (
    <div className="timer">
      <span className='digits min'>{
        currentMin.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
        :</span>
      <span className='digits'>{currentSec.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:</span>

      <span className='digits'>
        {currentMillisec.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
      </span>
    </div>
  )
}