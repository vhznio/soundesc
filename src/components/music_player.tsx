'use client'

import React, { useState } from 'react';

const songs = [
  {
    title: 'Resonance',
    artist: 'HOME',
    url: 'HOME Resonance.mp3',
  },
];

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };

  return (
    <div className="p-4  rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Reproductor de música</h1>
      <h2 className="text-xl font-semibold mb-1">{currentSong.title}</h2>
      <h3 className="text-lg mb-4">{currentSong.artist}</h3>
      <audio controls src={currentSong.url} onEnded={playNextSong} className="w-full bg-gradient to-emerald-500 via-indigo-500 from-blue-600" />
    </div>
  );
};

export default MusicPlayer;

