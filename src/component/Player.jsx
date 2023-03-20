import React from "react";
import {Tracks} from './Tracks'
import {ProgressBar} from './ProgressBar'
import {DisplayTrack} from './DisplayTrack'
import {Controls} from './Controls'
import { useState, useRef } from "react"; 


export function Player () {

    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(Tracks[trackIndex]);
    const audioRef = useRef();
    const progressBarRef = useRef();
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleNext = () => {
        if (trackIndex >= Tracks.length - 1) {
          setTrackIndex(0);
          setCurrentTrack(Tracks[0]);
        } else {
          setTrackIndex((prev) => prev + 1);
          setCurrentTrack(Tracks[trackIndex + 1]);
        }
      };

       
      return <div className="player mx-auto w-1/3 my-20 p-5 ">
                <DisplayTrack 
                    currentTrack={currentTrack} 
                    audioRef={audioRef} 
                    progressBarRef={progressBarRef}
                    setDuration={setDuration} 
                    handleNext={handleNext}/>
                <Controls 
                    audioRef={audioRef} 
                    progressBarRef={progressBarRef} 
                    duration={duration} 
                    setTimeProgress={setTimeProgress} 
                    tracks={Tracks}
                    trackIndex={trackIndex}
                    setTrackIndex={setTrackIndex}
                    setCurrentTrack={setCurrentTrack} 
                    handleNext={handleNext} />
                <ProgressBar 
                    progressBarRef={progressBarRef}
                    audioRef={audioRef} 
                    timeProgress={timeProgress} 
                    duration={duration} />
            </div>
        
}