import React, { useEffect, useRef, useState } from "react";

const CustomAudioControls = ({ audioLink }) => {
  const audioRef = useRef(new Audio(audioLink));
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    audio.addEventListener("loadedmetadata", () => {
      const seconds = Math.floor(audio.duration);
      setDuration(seconds);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioLink]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const backThirty = () => {
    audioRef.current.currentTime -= 30;
  };

  const forwardThirty = () => {
    audioRef.current.currentTime += 30;
  };

  return (
    <div className="custom-audio-controls">
      <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={backThirty}>Rewind</button>
      <button onClick={forwardThirty}>Fast Forward</button>
      {/* <AudioDuration audioLink={audioLink} /> */}
      <audio ref={audioRef} controls />
    </div>
  );
};

export default CustomAudioControls;
