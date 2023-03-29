import React from "react";
import {Tracks} from './Tracks'
import {ProgressBar} from './ProgressBar'
import {DisplayTrack} from './DisplayTrack'
import {Controls} from './Controls'
import { useState, useRef, useEffect } from "react"; 


function Switch ({setTheme}) {

    function handleChange (e) {
        let value = e.target.checked;
        if (value) {
            setTheme("dark")
        }else {
            setTheme("light")
        }
    }

    return <div className="switch absolute">
                <div className="switch_">
                    <input onChange={handleChange} type="checkbox" id="switch-"/>
                    <label htmlFor="switch-"></label>
                </div>
            </div>
}

export function Player () {
    
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(Tracks[trackIndex]);
    const audioRef = useRef();
    const progressBarRef = useRef();
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [theme, setTheme] = useState("light");
    const [transitionName, setTransitionName] = useState("fade");

   

    useEffect(() => {
        const player = document.getElementById("player");

        if (theme === "light") {
            document.body.classList.add("lightBack");
            player.classList.add('lightPlayer');
        
            document.body.classList.remove("darkBack");
            player.classList.remove('darkPlayer');
           
        } 
            if (theme === "dark") {
            document.body.classList.add("darkBack");
            player.classList.add('darkPlayer'); 

            document.body.classList.remove("lightBack");
            player.classList.remove('lightPlayer');
           
        }
      }, [theme]);


    const handleNext = () => {

        setTransitionName("fade");

        if (trackIndex >= Tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(Tracks[0]);
    
            } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(Tracks[trackIndex + 1]);

            }
        
        
      };
          
      return  <section>    
                <div id="player" className="container player mx-auto w-4/5 lg:w-1/3 mt-24 lg:mt-8 p-5 relative">
                    <Switch theme={theme} setTheme={setTheme} />
                    <DisplayTrack 
                        currentTrack={currentTrack} 
                        audioRef={audioRef} 
                        progressBarRef={progressBarRef}
                        setDuration={setDuration} 
                        handleNext={handleNext}
                        tracks={Tracks}
                        trackIndex={trackIndex} 
                        transitionName={transitionName} 
                         />
                    <Controls 
                        audioRef={audioRef} 
                        progressBarRef={progressBarRef} 
                        duration={duration} 
                        setTimeProgress={setTimeProgress} 
                        tracks={Tracks}
                        trackIndex={trackIndex}
                        setTrackIndex={setTrackIndex}
                        setCurrentTrack={setCurrentTrack} 
                        handleNext={handleNext} 
                        theme={theme}
                        currentTrack={currentTrack} 
                        setTransitionName={setTransitionName} />
                    <ProgressBar 
                        progressBarRef={progressBarRef}
                        audioRef={audioRef} 
                        timeProgress={timeProgress} 
                        duration={duration} />
                </div>
            </section>    
}