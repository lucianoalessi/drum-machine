import React, { useEffect, useState } from 'react';
import './App.css';
import speaker from './images/speaker.png'
import './font/PressStart2P-Regular.ttf'
import './font/Orbitron-VariableFont_wght.ttf'
import './font/ShareTechMono-Regular.ttf'


function App() {


  const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


const [volume , setVolume] = useState(1)
const [recording , setRecording] = useState('')


//rendering

  return (
    <div className="App">

      <h1 className='tittle'>Drum Machine </h1>

      <img
          src={speaker}
          className='speaker'/>

      <div className='main-container' id="drum-machine">

        <div className='drum-pads-container'>
          {audioClips.map((clip) => (
            <Button 
            key={clip.id} 
            clip={clip} 
            volume={volume} 
            setRecording={setRecording} />
          )
            )
              }
        </div>
                
        <div className='config-container' id="display">
          <h4 className='volume'>Volume</h4>
          <input
          type='range'
          step='0.01'
          onChange={(event) => setVolume(event.target.value)}
          value={volume}
          max='1'
          min='0'
          className='volume-range'
          />
          <div className='display'>
            {recording}
          </div>

        </div>

      </div>
      
      <div className='author'>
          Designed and Coded by
          <br/>
          <a href='https://www.linkedin.com/in/lucianoalessi/' target='_blank'>Luciano A. Alessi</a>
        </div>

    </div>
  );
}


//Create a Component: Button.

function Button( { clip, volume, setRecording} ) {

  const [active, setActive] = useState(false);
  

// add an event for when a keyboard key is pressed perform an action.

    useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []); 


  const handleKeyPress = (event) => {
    if (event.keyCode === clip.keyCode) {
      playSound();
    }
  }; 

//define the playsound function to play each sound.

const playSound = () => {
  const audioTag = document.getElementById(clip.keyTrigger);
  audioTag.currentTime = 0;
  audioTag.volume = volume;
  audioTag.play();
  setActive(true);
  setTimeout(() => setActive(false), 200);
  setRecording(clip.id);
};

return (
  <div
  onClick={playSound}
  className={`drum-pad ${active && "btn-warning"}`}
  id="drum-pad"
  >
    <audio className='clip' id={clip.keyTrigger} src={clip.url} />
    {clip.keyTrigger}
  </div>
  );
}



export default App;
