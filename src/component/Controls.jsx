import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";


function ButtonPause ({theme, handleClick}) {

  if(theme === "light") {
    return <button className="pl-6 py-5 m-3 pause-light" onClick={handleClick}><i className="fa-solid fa-pause pl-0.5"></i></button>
  }
  if(theme === "dark") {
    return <button className="pl-6 py-5 m-3 pause-dark" onClick={handleClick}><i className="fa-solid fa-pause pl-0.5"></i></button>
  }

}

function ButtonPlay ({theme, handleClick}) {

  if (theme === "light") {
    return <button className="px-6 py-5 m-3 play-light" onClick={handleClick}><i className="fa-solid fa-play pl-0.5"></i></button>
  }
  if (theme === "dark") {
    return <button className="px-6 py-5 m-3 play-dark" onClick={handleClick}><i className="fa-solid fa-play pl-0.5"></i></button>
  }
}



export function Controls ({audioRef, progressBarRef, duration, setTimeProgress, tracks, trackIndex, setTrackIndex, setCurrentTrack, handleNext, theme}) {

    const playAnimationRef = useRef();
    const[isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(progressBarRef.current.value / duration) * 100}%`
        );
      
        playAnimationRef.current = requestAnimationFrame(repeat);
      },[progressBarRef, audioRef, setTimeProgress, duration]);

    function handleClick () {
        if (isPlaying) {
            setIsPlaying(false)
        } else {
            setIsPlaying(true)
        }
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
      }, [isPlaying, audioRef, repeat]);

      useEffect(() => {
        if (audioRef) {
          audioRef.current.volume = volume / 100;
          audioRef.current.muted = muteVolume;
        }
      }, [volume, audioRef, muteVolume]);

      const handlePrevious = () => {
        if (trackIndex === 0) {
          let lastTrackIndex = tracks.length - 1;
          setTrackIndex(lastTrackIndex);
          setCurrentTrack(tracks[lastTrackIndex]);
        } else {
          setTrackIndex((prev) => prev - 1);
          setCurrentTrack(tracks[trackIndex - 1]);
        }
      };

      const onVolumeMute = () => {
        if (muteVolume) {
            setMuteVolume(false)
        } else {
            setMuteVolume(true)
        } 
      }

    return <React.Fragment>
        <div className="volume-wrapper px-3 pb-2 flex justify-center lg:justify-end">
            <div className="volume w-2/3 mt-4 flex flex-col justify-around items-center lg:flex-row lg:w-1/3 lg:justify-end">
                <button className="px-3 py-3" onClick={onVolumeMute}>{muteVolume ? <i className="fa-solid fa-volume-xmark"></i> : <i className="fa-solid fa-volume-high"></i>} </button>
                <input type="range" 
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    style={{
                        background: `linear-gradient(to right, #de8f2f ${volume}%, #ccc ${volume}%)`,
                        }} 
                    /> 
            </div>                 
        </div> 
        <div className="pauseAndPlay lg:w-2/3 mx-auto mb-4 mt-7">
            <button onClick={handleNext} className="p-5 m-3"><i className="fa-solid fa-backward-step"></i></button>   
            {isPlaying ? <ButtonPause theme={theme} handleClick={handleClick} /> : <ButtonPlay theme={theme} handleClick={handleClick} />}
            <button onClick={handlePrevious} className="p-5 m-3"><i className="fa-solid fa-forward-step"></i></button>
        </div>
          
    </React.Fragment>
}