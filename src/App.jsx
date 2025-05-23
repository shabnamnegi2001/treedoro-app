import { useEffect, useRef, useState } from 'react'
import './App.css'
import bellSound from "./assets/Ascending-bell-tones-sound-effect/Ascending-bell-tones-sound-effect.mp3";
import seedlingImage from './assets/seedling-image.jpg';
import seedling from './assets/seedling.jpg';
import tree from './assets/tree.png';
import appletree from './assets/apple-tree.png';


function App() {

const [remainingTime, setRemainingTime] = useState(60);

const [inputClick, setInputClick] = useState(true);
const [startClicked, setstartClicked] = useState(false);
const [stopClicked, setstopClicked] = useState(false);
const [minute, setMinute] = useState(String(Math.floor((remainingTime%3600)/60)).padStart(2, "0"));
// const [second, setSecond] = useState(String(Math.floor(remainingTime%60)).padStart(2, "0"));
const intervalIdRef = useRef(null);

const applyTime = () => {
    const totalTime = parseInt(minute)*60 ;
  // const totalTime = parseInt(minute)*60 + parseInt(second);
  setRemainingTime(totalTime);
  setInputClick(true);
}

// useEffect(() => {
//   const totalTime = parseInt(minute)*60 + parseInt(second);
//   setRemainingTime(totalTime);
// })

const applyImage = () => {
  const total = parseInt(minute)*60 ;
  const progress = total === 0 ? 0 :( 1- remainingTime/total);
  if(progress< 0.25) return seedling;
  if(progress<0.5) return seedlingImage;
  if(progress<0.75) return tree;
  else return appletree;
}

const startTimer = () => {
  setstartClicked(true);
  setstopClicked(false);
  if (intervalIdRef.current !== null) return;

  intervalIdRef.current = setInterval(() => {
    setRemainingTime(prev => {
      if (prev <= 1) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        playSound();
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};
 
const stopTimer = () => {
  setstopClicked(true);
  setstartClicked(false);
  clearInterval(intervalIdRef.current)
  intervalIdRef.current = null;
}

const playSound = () => {
  const audio = new Audio(bellSound);
  audio.play();
}


  return (
    <>
      <div className='main-container'>
        <div className='seedling-container'>
        <img className="seedling-image" src={applyImage()} alt='tree image' height={300} width={300} />
        </div>
        {
          inputClick ? (
             <h1 className='timer-display'>
          <span onClick={stopClicked ? (() => setInputClick(false)):(() => setInputClick(true))}>{String(Math.floor(remainingTime/60)).padStart(2, "0")}</span>:
          <span onClick={stopClicked ? (() => setInputClick(false)):(() => setInputClick(true))}>{String(Math.floor(remainingTime%60)).padStart(2, "0")}</span>
            </h1>
          ) :
          (
            <div className='applied-timer-container' onBlur={applyTime}>
            <input type='number' value={minute} onChange={(e) => setMinute(e.target.value) }/>
            {/* <input type='number' value={second} onChange={(e) => setSecond(e.target.value) }/> */}
            {/* <button onClick={applyTime}>Done</button> */}
            </div>
          )
        } 

       <p className='timer-button'><span>
        <button onClick={startTimer}
        style={{
          color: startClicked ? "white" : "black",
          backgroundColor: startClicked? "rgba(15, 197, 15, 0.815)": "white",
        }}
        >start</button>

        <button onClick={stopTimer}
         style={{
          color: stopClicked ? "white" : "black",
          backgroundColor: stopClicked? "rgba(15, 197, 15, 0.815)": "white",
        }}>stop</button>
        </span></p>
      </div>
    </>
  )
}

export default App