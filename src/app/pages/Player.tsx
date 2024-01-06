"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { TbRewindBackward10 } from "react-icons/tb";
import { TbRewindForward10 } from "react-icons/tb";
import { useSelector } from "react-redux";
import styles from "../styles/styles.module.css";
import { CgSpinner } from "react-icons/cg";
import { Book } from "../API Data/book";

interface RootState {
  textSize: {
    textSize: string;
  };
}

const Player = () => {
  const [book, setBook] = useState<Book[]>([]);
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const textSize = useSelector((state: RootState) => state.textSize.textSize);
  const audio = audioRef.current;
  const progressBar = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayerPage = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        console.log(data);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    if (id) {
      getPlayerPage();
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current as HTMLAudioElement | null;

    const handleLoadedMetadata = () => {
      if (audio && audio.duration) {
        const seconds = Math.floor(audio.duration);
        setDuration(seconds);
        progressBar.current?.setAttribute("max", seconds.toString());
      }
    };

    if (audio) {
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [audioRef.current]);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const whilePlaying = () => {
    const audio = audioRef.current;

    if (audio && audio.duration) {
      const newTime = (audio.currentTime / audio.duration) * 100;

      const progressBarElement = progressBar.current as HTMLInputElement | null;

      if (progressBarElement) {
        progressBarElement.style.setProperty("--range-progress", `${newTime}%`);
        progressBarElement.value = audio.currentTime.toString();
      }

      setCurrentTime(audio.currentTime);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      cancelAnimationFrame(animationRef.current as number);
    }

    return () => {
      cancelAnimationFrame(animationRef.current as number);
    };
  }, [isPlaying]);

  const changeRange = () => {
    const newTime = progressBar.current?.value;

    if (newTime && typeof newTime === "string") {
      const parsedTime = parseFloat(newTime);

      if (!isNaN(parsedTime)) {
        audioRef.current!.currentTime = parsedTime;
        setCurrentTime(parsedTime);

        progressBar.current!.style.setProperty(
          "--seek-before-width",
          `${(parsedTime / duration) * 100}%`
        );
      }
    }
  };

  const changePlayerCurrentTime = () => {
    const progressBarElement = progressBar.current;

    if (progressBarElement instanceof HTMLInputElement) {
      progressBarElement.style.setProperty(
        "--seek-before-width",
        `${(progressBarElement.valueAsNumber / duration) * 100}%`
      );
      setCurrentTime(progressBarElement.valueAsNumber);
    }
  };

  const backTen = () => {
    const progressBarElement = progressBar.current;

    if (progressBarElement instanceof HTMLInputElement) {
      progressBarElement.value = (
        Number(progressBarElement.value) - 10
      ).toString();
      changeRange();
    }
  };

  const forwardTen = () => {
    const progressBarElement = progressBar.current;

    if (progressBarElement instanceof HTMLInputElement) {
      const newTime = Number(progressBarElement.value) + 10;
      const maxTime = Number(progressBarElement.max);

      const adjustedTime = Math.min(newTime, maxTime);

      progressBarElement.value = adjustedTime.toString();
      changeRange();
    }
  };

  const handlePlay = () => {
    const currentAudio = audioRef.current;

    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
        cancelAnimationFrame(animationRef.current as number);
      } else {
        currentAudio.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const currentAudio = audioRef.current;

    if (currentAudio) {
      setCurrentTime(currentAudio.currentTime);
    }
  };

  const handleDurationChange = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    setDuration(e.currentTarget.duration);
  };

  return (
    <section className="player__page">
      <div className="container">
        <div className="row">
          {book && (
            <>
              {loading ? (
                <figure className="spinner__wrapper">
                  <CgSpinner className="spinner" />
                </figure>
              ) : (
                <div className="page__book--wrapper">
                  <h1 className="page__book--title">
                    {(book as unknown as Book).title}
                  </h1>
                  <p className={`page__book--text text-size-${textSize}`}>
                    {(book as unknown as Book).summary}
                  </p>
                </div>
              )}
              <div className="page__book--audio">
                <div className="audio__book--wrapper">
                  {loading ? (
                    <div className="skeleton player__page-img__skeleton"></div>
                  ) : (
                    <figure className="audio__book--img--wrapper">
                      <Image
                        className="audio__book--img"
                        src={(book as unknown as Book).imageLink}
                        width={50}
                        height={50}
                        alt={""}
                      />
                    </figure>
                  )}
                  <div className="audo__title--wrapper">
                    {loading ? (
                      <div className="skeleton player__page-title__skeleton"></div>
                    ) : (
                      <h4 className="audio__book--title">
                        {(book as unknown as Book).title}
                      </h4>
                    )}
                    {loading ? (
                      <div className="skeleton player__page-author__skeleton"></div>
                    ) : (
                      <h5 className="audio__book--author">
                        {(book as unknown as Book).author}
                      </h5>
                    )}
                  </div>
                </div>
                <div className="play__buttons--wrapper">
                  <div className="rewind">
                    <TbRewindBackward10 onClick={backTen} />
                  </div>
                  {isPlaying ? (
                    <div className="play-button" onClick={handlePlay}>
                      <FaCirclePause />
                    </div>
                  ) : (
                    <div className="play-button" onClick={handlePlay}>
                      <FaCirclePlay />
                    </div>
                  )}
                  <div className="fast-forward">
                    <TbRewindForward10 onClick={forwardTen} />
                  </div>
                </div>
                <div className="time__duration">
                  <div className="audio__time">
                    {calculateTime(currentTime)}
                  </div>

                  <input
                    type="range"
                    defaultValue="0"
                    ref={progressBar}
                    onChange={changeRange}
                    className={styles.progressBar}
                  />

                  <div className="audio__time">{calculateTime(duration)}</div>
                  <div className="audio__time--file">
                    <audio
                      ref={audioRef}
                      src={(book as unknown as Book).audioLink}
                      onTimeUpdate={handleTimeUpdate}
                      onDurationChange={handleDurationChange}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Player;
