import React, { useEffect, useState } from "react";

function AudioDuration({ audioLink, showCurrentTime, showDurationTime }) {
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");

  useEffect(() => {
    const audio = new Audio(audioLink);

    audio.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    });

    if (showCurrentTime) {
      audio.addEventListener("timeupdate", () => {
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        setCurrentTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      });
    }

    return () => {
      audio.removeEventListener("loadedmetadata", () => {});
      if (showCurrentTime) {
        audio.removeEventListener("timeupdate", () => {});
      }
      audio.pause();
    };

    audio.load();
  }, [audioLink, showCurrentTime, showDurationTime]);

  return (
    <div className="audio-duration">
      {showCurrentTime && <div>{currentTime}</div>}
      {showDurationTime && <div>{duration}</div>}
    </div>
  );
}

export default AudioDuration;
