import { useEffect, useState } from "react";

export default function Timer( props ) {

  const [currentMillisec, setCurrentMillisec] = useState(0);
  const [currentSec, setCurrentSec] = useState(0);
  const [currentMin, setCurrentMin] = useState(0);

  useEffect(() => {
    let interval;
    if (props.time) {
       interval = setInterval(() => {
            let ms = currentMillisec + 1;
            setCurrentMillisec(ms);
            }, 10);
    } else {
        clearInterval(interval);
    }

    return () => {
        clearInterval(interval);
    };
});

useEffect(() => {
  if (currentMillisec === 99) {
      let sec = currentSec + 1;
      setCurrentSec(sec);
      setCurrentMillisec(0);
  }
},[currentMillisec, currentSec]);

useEffect(() => {
  if (currentSec === 60) {
      setCurrentSec(0);
      let min = this.state.currentMin + 1;
      setCurrentMin(min);
  }
},[currentMin, currentSec]);

    return (
      <div className="timer">
          {/* <span className="hours">
          {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}
          </span>
          <span>:</span>
          <span className='mins'>
          {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
          </span>
          <span>:</span>
          <span className='seconds'>
          {("0" + ((props.time / 10) % 100)).slice(-2)}
          </span> */}

<span className='digits min'>{
               currentMin.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
            :</span>
            <span className='digits'>{currentSec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:</span>

            <span className='digits'>
            {currentMillisec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} 
            </span>
      </div>
    )
  }