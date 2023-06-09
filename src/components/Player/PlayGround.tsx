'use client'

import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import { DefaultThumbnail } from "./DefaultThumbnail";
import { usePlayer } from "./usePlayer";

export const PlayGround = () => {
  const { playList, setCurrentMusic, currentMusic } = usePlayer();
  return (
    <div className="w-full h-screen overflow-auto bg-[#1e1e2f]">
      <div className="flex flex-col max-w-lg gap-3 mx-4 md:mx-auto mt-6 mb-20">
        {playList.map((music) => {
          const isPlaying = currentMusic.src === music.src;
          return (
            <div 
              key={music.id}
              onClick={() => {
                setCurrentMusic(music, true);
              }}
              className={`${
                isPlaying ? " border-emerald-300 dark:border-indigo-400" : "border-transparent"
              } flex gap-2 text-xs relative cursor-pointer transition-shadow duration-300 shadow-lg 
              hover:shadow-none bg-gradient-to-l to-pink-500 from-indigo-500 dark:bg-gradient-to-l 
              dark:to-emerald-950 dark:from-indigo-950 rounded-2xl overflow-hidden text-yellow-500 
              dark:text-emerald-400 border-2 border-dotted`}
            >
              <div className="w-3/12 h-20">
                {music.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="rounded-lg h-full w-full object-cover"
                    alt={music.title}
                    src={music.thumbnail}
                  />
                ) : (
                  <DefaultThumbnail />
                )}
              </div>
              <div className="w-8/12 flex flex-col gap-3 justify-center">
                <h6 className="font-semibold text-sm">{music.title}</h6>
                <p className="text-xs text-amber-800 dark:text-gray-400">{music.artist}</p>
              </div>
              <div className="w-1/12 flex justify-center items-center text-2xl bg-white/30 dark:bg-black/30">
                {isPlaying ? <TbPlayerPause size={25}/> : <TbPlayerPlay size={25}/>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};