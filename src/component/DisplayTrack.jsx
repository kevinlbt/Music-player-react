import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export function DisplayTrack ({currentTrack, audioRef, progressBarRef, setDuration, handleNext, transitionName}) {
    
    function onLoadedMetadata () {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }

    const childFactoryCreator = (classNames) => (
        (child) => (
          React.cloneElement(child, {
            classNames
          })
        )
      );

    return <div>
            <audio src={currentTrack.src} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={handleNext} />
            <div className="audio-info text-center lg:text-left">
                <TransitionGroup
                    childFactory={childFactoryCreator(transitionName === "fade" ? "fade" : "fadeout")}
                >
                    <CSSTransition
                        appear={true}
                        key={currentTrack.id}
                        timeout={350}
                        classNames={transitionName === "fade" ? "fade" : "fadeout"}
                    >   
                        <img className="active pt-2 w-4/5 object-cover mx-auto" src={currentTrack.thumbnail} alt="music-img"></img>                      
                    </CSSTransition>
                </TransitionGroup>
                <h2 className="lg:text-xl mx-auto text-lg font-medium lg:ml-16 pt-7">{currentTrack.title} </h2>
                <h3 className="lg:text-xl mx-auto italic text-lg font-base lg:ml-16">{currentTrack.author} </h3>
            </div>
        </div>
      
}