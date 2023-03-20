
export function DisplayTrack ({currentTrack, audioRef, progressBarRef, setDuration, handleNext}) {
    
    function onLoadedMetadata () {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }

    return <div>
            <audio src={currentTrack.src} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={handleNext} />
            <div className="audio-info">
                <div>
                    <img className="pt-2 w-3/4 object-cover mx-auto" src={currentTrack.thumbnail} alt="music-img"></img>
                </div>
                <h2 className="text-xl font-medium ml-6 pt-7">{currentTrack.title} </h2>
                <h3 className="text-xl font-medium ml-6">{currentTrack.author} </h3>
            </div>
        </div>
      
}