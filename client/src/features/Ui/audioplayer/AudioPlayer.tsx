import React from "react";
import "./AudioPlayer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

type AudioPlayerProps = {
  audioUrl: string;
  onDownloadRecord: () => Promise<void>;
  onHidePlayer: () => void;
  onPlayInit: () => Promise<void>;
  formattedCallTime: string;
};

function AudioPlayer({
  audioUrl,
  onDownloadRecord,
  onPlayInit,
  formattedCallTime,
  onHidePlayer,
}: AudioPlayerProps): JSX.Element | null {
  console.log("Audio URL:", audioUrl);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = (): void => setCurrentTime(audio.currentTime);
      const updateDuration = (): void => setDuration(audio.duration);
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", updateDuration);
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, []);

  const togglePlay = async (): Promise<void> => {
  try {
    const audio = audioRef.current;

    if (!audioUrl) {
      await onPlayInit();

      setTimeout(() => {
        const updatedAudio = audioRef.current;
        if (updatedAudio) {
          updatedAudio.play().catch(console.error);
          setIsPlaying(true);
        }
      }, 200); 

      return;
    }

    if (!audio) return;

    if (!isPlaying) {
      if (audio.readyState < 4) {
        await new Promise<void>((resolve) => {
          const handleCanPlay = (): void => {
            audio.removeEventListener("canplaythrough", handleCanPlay);
            resolve();
          };
          audio.addEventListener("canplaythrough", handleCanPlay);
          setTimeout(() => resolve(), 1000);
        });
      }
      await audio.play();
    } else {
      audio.pause();
    }

    setIsPlaying(!isPlaying);
  } catch (error) {
    console.error("Ошибка при воспроизведении:", error);
  }
};

  const handleDownload = async (): Promise<void> => {
    await onDownloadRecord();
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const time = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleHidePlayer = (): void => {
    setIsVisible(false);
    onHidePlayer();
  };

  const progress = (currentTime / duration) * 100 || 0;

  return isVisible ? (
    <div className="audio__player">
      <audio ref={audioRef} src={audioUrl} preload="auto">
        <track kind="metadata" />
        <track
          kind="captions"
          src="captions.vtt"
          srcLang="ru"
          label="Russian"
        />
      </audio>
      <div className="audio__player__call-time">{formattedCallTime}</div>
      <div className="audio__player__controls">
        <button
          className="audio__player__controls__button"
          type="button"
          onClick={togglePlay}
        >
          <FontAwesomeIcon
            className="audio__player__controls__play"
            icon={isPlaying ? faPause : faPlay}
          />
        </button>
        <div className="audio__player__progress__container">
          <div
            className="audio__player__progress__fill"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            className="audio__player__progress"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
        </div>
        <button type="button" onClick={handleDownload} aria-label="Download">
          <span className="audio__player__download__button">
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 16H13V14.1176H0V16ZM13 5.64706H9.28571V0H3.71429V5.64706H0L6.5 12.2353L13 5.64706Z"
              />
            </svg>
          </span>
        </button>
        <button
          className="audio__player__controls__hide"
          type="button"
          onClick={handleHidePlayer}
          aria-label="Hide Player"
        >
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 14"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
            />
          </svg>
        </button>
      </div>
    </div>
  ) : (
    <span className="audio__player__call-time">{formattedCallTime}</span>
  );
}

export default AudioPlayer;
