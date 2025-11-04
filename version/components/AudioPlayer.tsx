import React, { useState, useRef, useEffect } from 'react';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Música de Natal livre de royalties.
    // Fonte: https://pixabay.com/music/christmas-we-wish-you-a-merry-christmas-126685/
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/11/20/audio_24b4556488.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Define um volume padrão agradável
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("A reprodução de áudio falhou:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className="w-14 h-14 bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
};

export default AudioPlayer;
