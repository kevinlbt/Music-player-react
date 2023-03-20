
export const ProgressBar = ({progressBarRef, audioRef, timeProgress, duration}) => {

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
          const minutes = Math.floor(time / 60);
          const formatMinutes =
            minutes < 10 ? `0${minutes}` : `${minutes}`;
          const seconds = Math.floor(time % 60);
          const formatSeconds =
            seconds < 10 ? `0${seconds}` : `${seconds}`;
          return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
      };

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    }

    return (
      <div className="progress w-11/12 py-4 mx-auto flex flex-row items-center">
        <span className="mx-4">{formatTime(timeProgress)}</span>
        <input type="range" ref={progressBarRef} defaultValue="0" onChange={handleProgressChange} />
        <span className="mx-4">{formatTime(duration)}</span>
      </div>
    );
  };
