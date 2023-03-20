import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";

export function Controls ({audioRef, progressBarRef, duration, setTimeProgress, tracks, trackIndex, setTrackIndex, setCurrentTrack, handleNext}) {

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
        <div className="volume-wrapper p-2 flex flex-row justify-end">
            <div className="volume w-2/5 flex flex-row justify-around items-center">
                <button className="px-3" onClick={onVolumeMute}>{muteVolume ? <i className="fa-solid fa-volume-xmark"></i> : <i className="fa-solid fa-volume-high"></i>} </button>
                <input type="range" 
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    style={{
                        background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
                        }} 
                    /> 
            </div>                 
        </div> 
        <div className="pauseAndPlay w-2/3 mx-auto py-4">
            <button onClick={handleNext} className="p-5 m-3"><i className="fa-solid fa-backward-step"></i></button>   
            {isPlaying ? <button className="pl-6 py-5 m-3 pause" onClick={handleClick}><i className="fa-solid fa-pause pl-0.5"></i></button> : <button className="px-6 py-5 m-3 play" onClick={handleClick}><i className="fa-solid fa-play pl-0.5"></i></button>}
            <button onClick={handlePrevious} className="p-5 m-3"><i className="fa-solid fa-forward-step"></i></button>
        </div>
          
    </React.Fragment>
}