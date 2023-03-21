
export function DisplayTrack ({currentTrack, audioRef, progressBarRef, setDuration, handleNext}) {
    
    function onLoadedMetadata () {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }

    return <div>
            <audio src={currentTrack.src} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={handleNext} />
            <div className="audio-info text-center lg:text-left">
                <div>
                    <img className="pt-2 w-4/5 object-cover mx-auto" src={currentTrack.thumbnail} alt="music-img"></img>
                </div>
                <h2 className="lg:text-xl text-lg font-medium lg:ml-16 pt-7">{currentTrack.title} </h2>
                <h3 className="lg:text-xl italic text-lg font-base lg:ml-16">{currentTrack.author} </h3>
            </div>
        </div>
      
}