/* eslint-disable @next/next/no-img-element */
"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";
import {
  TbArrowsShuffle,
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
} from "react-icons/tb";
import {BiVolumeMute, BiVolumeFull, BiVolumeLow} from "react-icons/bi"
import { DefaultThumbnail } from "./DefaultThumbnail";
import { usePlayer } from "./usePlayer";
import { secondsToMinutes } from "./utils";

export const Player = () => {
  const [isRandom, setIsRandom] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  const [volume, setVolume] = useState(100);

  const volumeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closeVolume = (e: any) => {
      if (!volumeRef.current?.contains(e.target)) setIsVolumeOpen(false);
    };
    document.addEventListener("click", closeVolume, true);
    return () => {
      document.removeEventListener("click", closeVolume, true);
    };
  }, []);

  const audioRef = useRef<HTMLAudioElement>();
  const { currentMusic, setCurrentMusic, playList } = usePlayer();

  useEffect(() => {
    audioRef.current = new Audio(currentMusic.src);

    // volume changer
    audioRef.current.addEventListener("volumechange", (e: any) => {
      setVolume(+e.target.volume);
    });

    // play and pause
    audioRef.current.addEventListener("play", () => {
      setCurrentMusic({ isPlaying: true });
    });
    audioRef.current.addEventListener("pause", () => {
      setCurrentMusic({ isPlaying: false });
    });

    // got to the next music when current one finished
    audioRef.current.addEventListener("ended", (e: any) => {
      skipNext(new URL(e.target.src).pathname);
    });

    //lets trigger when audio is ready
    audioRef.current.addEventListener("canplay", () => {
      audioRef.current?.play();
    });

    // time and duration
    audioRef.current.addEventListener("loadedmetadata", (e: any) => {
      setCurrentMusic({
        curTime: e.target.currentTime,
        duration: e.target.duration,
      });
    });
    audioRef.current.addEventListener("timeupdate", (e: any) => {
      setCurrentMusic({
        curTime: e.target.currentTime,
      });
    });

    return () => {
      audioRef.current?.pause();
    };
  }, [currentMusic.src]);

  const skipNext = (src: string) => {
    const idx = playList.findIndex((m) => m.src === src);
    if (isRandom) return skipRandom(idx);

    // if we are in last music
    if (idx === playList.length - 1) {
      // go to first one
      setCurrentMusic(playList[0], true);
    } else {
      setCurrentMusic(playList[idx + 1], true);
    }
  };

  const skipPrev = (src: string) => {
    const idx = playList.findIndex((m) => m.src === src);
    if (isRandom) return skipRandom(idx);

    if (idx === 0) {
      setCurrentMusic(playList[playList.length - 1]);
    } else {
      setCurrentMusic(playList[idx - 1]);
    }
  };

  const skipRandom = (idx: number) => {
    const randIdx = Math.floor(Math.random() * playList.length);
    if (randIdx === idx) {
      skipRandom(idx);
    } else {
      setCurrentMusic(playList[randIdx]);
    }
  };

  return (
    <div className="fixed w-screen bottom-0">
      <div className="w-full py-4 bg-indigo-950/80 backdrop-blur-2xl rounded-t-[2rem] text-white shadow-xl shadow-indigo-500">
        <div className="flex max-[600px]:flex-col container mx-full px-3 lg:px-3 flex justify-between">
          {/* title and thumbnail */}
          <div className="flex items-stretch lg:w-3/12 gap-5">
            <div className="w-14 h-14 lg:flex-shrink-0">
              {currentMusic.thumbnail ? (
                <img
                  src={currentMusic.thumbnail}
                  alt={currentMusic.title}
                  className="rounded-xl"
                />
              ) : (
                <DefaultThumbnail />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-sm font-semibold">{currentMusic.title}</h6>
              <span className="text-xs text-gray-400">
                {currentMusic.artist}
              </span>
            </div>
          </div>
          {/* play/pause and next/prev icons */}
          <div className="flex items-center justify-center gap-3 lg:w-2/12">
            <button onClick={() => skipPrev(currentMusic.src)}>
              <TbPlayerSkipBack size={20} />
            </button>
            <button
              onClick={() => {
                if (currentMusic.isPlaying) {
                  audioRef.current?.pause();
                } else {
                  audioRef.current?.play();
                }
              }}
              className="duration-600 rounded-full hover:rounded-lg p-1 border border-emerald-500 "
            >
              {currentMusic.isPlaying ? (
                <TbPlayerPause size={26} />
              ) : (
                <TbPlayerPlay size={26} />
              )}
            </button>
            <button onClick={() => skipNext(currentMusic.src)}>
              <TbPlayerSkipForward size={20} />
            </button>
          </div>
          {/* progress */}
          <div className=" md:flex w-6/12 flex-col gap-1 justify-center cursor-pointer hidden sm:visible">
            <Slider
              trackStyle={{ background: "rgb(126 34 206)" }}
              handleStyle={{
                border: "2px solid rgb(126 34 206)",
                background: "rgb(126 34 206)",
                boxShadow: "none",
                opacity: 1,
              }}
              min={0}
              max={currentMusic.duration}
              value={currentMusic.curTime}
              onChange={(val) => {
                audioRef.current!.currentTime = +val;
              }}
            />
            <div className="flex justify-between text-xs">
              <span>{secondsToMinutes(currentMusic.curTime)}</span>
              <span>{secondsToMinutes(currentMusic.duration)}</span>
            </div>
          </div>
          {/* settings */}
          <div className="flex justify-center gap-3 lg:w-2/12">
            <div className="relative flex items-center h-full" ref={volumeRef}>
              {isVolumeOpen && (
                <div className="flex absolute -top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-sm shadow-white w-8 h-20 rounded-xl overflow-hidden bg-neutral-100 py-4 justify-center">
                  <Slider
                    vertical
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(val) => {
                      audioRef.current!.volume = +val;
                    }}
                  />
                </div>
              )}
              <button onClick={() => setIsVolumeOpen(!isVolumeOpen)}>
              if (volume === 0) {
              <BiVolumeMute size={20} />}
              else if (volume == 50) {
              <BiVolumeLow size={20} />
              } else {
              <BiVolumeFull size={20} />
              }
              </button>
              </div>
              <button onClick={() => setIsRandom(!isRandom)}>
              <TbArrowsShuffle
                size={20}
                color={isRandom ? "rgb(64 64 64)" : ""}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};
