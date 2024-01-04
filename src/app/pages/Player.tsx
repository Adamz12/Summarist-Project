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

const Player = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const animationRef = useRef();
  const textSize = useSelector((state) => state.textSize.textSize);
  const audio = audioRef.current;
  const progressBar = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayerPage = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
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
    const audio = audioRef.current;

    if (audio && audio.duration) {
      const seconds = Math.floor(audio.duration);
      setDuration(seconds);
      progressBar.current.max = seconds;
    }
  }, [audioRef.current?.duration]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const whilePlaying = () => {
    const audio = audioRef.current;
    const newTime = (audio.currentTime / duration) * 100;
    progressBar.current.style.setProperty("--range-progress", `${newTime}%`);

    progressBar.current.value = audio.currentTime;
    setCurrentTime(audio.currentTime);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const changeRange = () => {
    const newTime = progressBar.current.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);

    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(newTime / duration) * 100}%`
    );
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backTen = () => {
    progressBar.current.value = Number(progressBar.current.value - 10);
    changeRange();
  };

  const forwardTen = () => {
    const newTime = Number(progressBar.current.value) + 10;
    const maxTime = progressBar.current.max;

    const adjustedTime = Math.min(newTime, maxTime);

    progressBar.current.value = adjustedTime;
    changeRange();
  };

  const handlePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audio.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.duration);
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
                  <h1 className="page__book--title">{book.title}</h1>
                  <p className={`page__book--text text-size-${textSize}`}>
                    {book.summary}
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
                        src={book.imageLink}
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
                      <h4 className="audio__book--title">{book.title}</h4>
                    )}
                    {loading ? (
                      <div className="skeleton player__page-author__skeleton"></div>
                    ) : (
                      <h5 className="audio__book--author">{book.author}</h5>
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
                      src={book.audioLink}
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
